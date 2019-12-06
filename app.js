const Koa = require('koa');
const parser=require('koa-bodyparser');//获取post数据 
const static=require('koa-static');
const path=require('path');
const InitManger=require('./core/init');//初始化
const catchError=require('./middlewares/exception');//异常中间件


const app = new Koa();

app.use(catchError);
app.use(parser());
app.use(static(path.join(__dirname,'./static')));

InitManger.initCore(app);
app.listen(3000)