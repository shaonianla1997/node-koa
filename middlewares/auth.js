const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level=level||1;
        Auth.USER=8;//权限等级
        Auth.ADMIN=16;
        Auth.SUPER_ADMIN=16;
    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req);
            let errMsg = 'token不合法';

            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg);
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey);
            } catch (error) {
                //token不合法
                //token过期
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token令牌已过期';
                }
                throw new global.errs.Forbbiden(errMsg)
            }

            if(decode.scope<this.level){
                errMsg='权限不足';
                throw new global.errs.Forbbiden(errMsg)
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            //token检测
            //token 获取
            await next();
        }
    }

    static verifyToken(token){
        try {
            jwt.verify(token,global.config.security.secretKey);
            return true
        } catch (error) {
            return false
        }
    }

}

module.exports = {
    Auth
}