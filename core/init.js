const requireDirectory = require('require-directory');
const Router=require('koa-router');
class InitManger {
    static initCore(app){
        //入口方法
        InitManger.app=app;
        InitManger.initLoadRouters();
        InitManger.loadHttpException();
        InitManger.loadConfig();
    }
	//加载配置文件
    static loadConfig(path=''){
        const configPath=path||process.cwd()+'/config/config.js';
        const config=require(configPath);
        global.config=config;
    }

    //自动装载 在app/api文件目录下的 router
    static initLoadRouters() {
        const apiDirectory=`${process.cwd()}/app/api`;
        requireDirectory(module, apiDirectory, { visit: whenLoadModule });
        //requireDirectory的回调方法 逐一注册
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManger.app.use(obj.routes())
            }
        }

    }
	//装载全局异常配置
    static loadHttpException(){
        const errors=require('./http-exception');
        global.errs=errors;
    }

}

module.exports=InitManger