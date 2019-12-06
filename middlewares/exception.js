const { HttpExcePtion } = require('../core/http-exception');

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        //error 堆栈调用
        //error 简化 
        //http status code 
        //ctx.body='服务器开小差了~'
        //message
        //error_code 详细
        //request_url 当前访问的url
        const isHttpExcePtion = error instanceof HttpExcePtion;
        const isDev = global.config.environment === 'dev';
        if (isDev && !isHttpExcePtion) {
            throw error;
        }
        if (isHttpExcePtion) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code;
        } else {
            ctx.body = {
                msg: 'we made a mistake (*^_^*)',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500;
        }

    }
}

module.exports = catchError

//切面编程AOP