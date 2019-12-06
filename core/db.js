const { Sequelize, Model } = require('sequelize');
const { unset, clone, isArray } = require('lodash');
const { dbName, host, port, user, password } = require('../config/config').database;
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    timezone: '+08:00',
    logging: true,
    define: {
        //creat_time update_time delete_time 
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updateAt: 'update_at',
        deleteAt: 'delete_at',
        underscored: true
    }
});

sequelize.sync({
    force: false//开启自动创建字段
});

//全局json序列化操作 控制返回值
Model.prototype.toJSON = function () {
    //let data=this.dataValues;
    let data = clone(this.dataValues);
    //console.log("data数据",data);
    unset(data, 'updatedAt');
    unset(data, 'created_at');
    unset(data, 'deletedAt');

    for (key in data) {
        if (key === 'image') {
            if (!data[key].startsWith('http'))
                data[key] = global.config.host + data[key]
        }
    }

    //通过exclude实现返回字段过滤 需要Model中设置exclude
    if (isArray(this.exclude)) {
        console.log("排除数组", this.exclude);
        this.exclude.forEach((value) => {
            unset(data, value)
        })
    }

    return data
}

module.exports = {
    sequelize
}