const util = require('util');
const axios=require('axios');

const {User} =require('../models/user');
const {generateToken} =require('../../core/util');
const {Auth}=require('../../middlewares/auth');

class WXManger {
    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code);
        const result=await axios.get(url);
        if(result.status!==200){
            throw new global.errs.AuthFailed("openid获取失败");
        }
        const errcode=result.data.errcode;
        const errormsg=result.data.errmsg;
        console.info(result);
        if(errcode){
            throw new global.errs.AuthFailed("openid获取失败:"+errormsg);
        }
        //拿到openid 
        //建立档案
        let user=await User.getUserByOpenId(result.data.openid);
        if(!user){
            user=await User.registerByOpenId(result.data.openid);
        }
        return generateToken(user.id,Auth.USER);
    }
}

module.exports={
    WXManger
}