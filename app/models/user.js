const bcrypt=require('bcryptjs');

const {
	sequelize
} = require('../../core/db');
const {
	Sequelize,
	Model
} = require('sequelize');

class User extends Model {
	static async verifyEmailPassword(email,plainPassword){
		const user=await User.findOne({
			where:{
				email
			}
		})
		if(!user){
			throw new global.errs.NotFound('账号不存在');
		}
		//密码校验
		const correct=bcrypt.compareSync(plainPassword,user.password);
		if(!correct){
			throw new global.errs.AuthFailed('密码不正确');
		}
		return user
	}

	static async getUserByOpenId(openid){
		const user=await User.findOne({
			where:{
				openid
			}
		})
		return user
	}

	static async registerByOpenId(openid){
		return await User.create({
			openid
		})
	}

}

User.init({
	//主键：不能重复 不能为空 
	//设计编号系统 id
	//考虑并发 自增长导致报错 
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nickname: Sequelize.STRING,
	email: {
		type: Sequelize.STRING(128),
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		//观察者模式
		set(val) {
			const salt = bcrypt.genSaltSync(10);// 10 计算机生成盐的成本  安全系数
			const psw = bcrypt.hashSync(val, salt);//密码加盐 防止彩虹攻击
			this.setDataValue('password',psw);
		}
	},
	openid: {
		type: Sequelize.STRING(64),
		unique: true
	}
}, {
	sequelize,
	tableName: 'user'
});

module.exports = {
	User
}

//数据迁移 sql更新 风险