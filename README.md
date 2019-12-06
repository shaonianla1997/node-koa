
## 简介

node-koa 是由Koa搭建的**快速开发框架**。

node-koa 可以有效的帮助开发者提高 NodeJs 的开发效率。


### node-koa 的特点

	node-koa 秉承了koa的宗旨,致力于成为一个更小、更富有表现力、更健壮的 Web 框架。
	数据持久化框架：Sequelize
	数据库：Mysql
	鉴权方案：jwt+basic-auth
	密码加密：bcryptjs
	参数校验：validator（基于lin-validator）
	开发者安装后,只需要负责api的开发,大大提高了开发效率。

#### node-koa 的目录结构
- app
	* api
		+ user.js api示例
	* lib
		+ enum.js js中枚举的仿照实现 
		+ help.js api调用成功状态下返回的固定模板 
	* models
		+ user.js 模型类
	* services 用于存放相关的sdk工具
	* validators 校验器
- config
	*  config.js 一些全局配置项
- core 
	* db.js数据库的驱动文件
	* http-exception.js 请求状态模板参数
	* init.js !!  用于配置项目的初始化参数 整个app的核心类
	* lin-validator-v2.js  七月（7yue.pro）开发的参数校验框架 用于参数校验 
	* util.js 配合validator使用 不可删除
- middlewares
	* auth.js权限校验的中间件
	* exception.js全局异常的中间件 
- static 
	静态资源文件
## 快速上手

```sh
# clone the project
git clone git@github.com:shaonianla1997/node-koa.git

# install dependency
npm install or yarn

# develop
node app.js

方便开发者对参数校验以及鉴权中间件的的使用,请参考api下的接口示例。
项目上线请配置pm2进程守护。

```