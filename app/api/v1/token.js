const Router = require('koa-router');

const { TokenValidator,NotEmptyValidator } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const { User } = require('../../models/user');
const {generateToken} =require('../../../core/util');
const {Auth} =require('../../../middlewares/auth');
const {WXManger} =require('../../services/wx');

const router = new Router({
    prefix: '/v1/token'
});
// TODO:(1)
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    //type校验 
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token=await emailLogin(v.get('body.account'),v.get('body.secret'));
            break;
        case LoginType.USER_MINI_PROGRAM:
            token=await WXManger.codeToToken(v.get('body.account'));
            break;
        case LoginType.USER_MOBILE:
            break;
        default:
            throw new global.errs.ParameterException('没有相对应的处理函数');
            break;
    }
    ctx.body={
        token
    }
})

router.post('/verify',async (ctx)=>{
    //tpken
    const v=await new NotEmptyValidator().validate(ctx);
    const result=Auth.verifyToken(v.get('body.token'));
    ctx.body={
        is_valid:result
    }
});

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret);
    return generateToken(user.id,Auth.USER);
}

module.exports = router