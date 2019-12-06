const Router = require('koa-router');

const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');
const router = new Router({
    prefix: '/v1/user'
});

//注册 新增数据
//中间件的形式是静态引入 只在全局实例化一次
router.post('/register', async (ctx) => {
    //思维路径 
    //接收参数 参数校验
    const v = await new RegisterValidator().validate(ctx);

    //SQl Model
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    };
    await User.create(user);
    throw new global.errs.Success();
})


module.exports = router