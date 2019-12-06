class HttpExcePtion extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super();
        this.errorCode = errorCode;
        this.code = code;
        this.msg = msg
    }
}

class ParameterException extends HttpExcePtion {
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || '参数错误';
        this.errorCode || 10000;
    }
}

class Success extends HttpExcePtion {
    constructor(msg, errorCode) {
        super();
        this.code = 201;
        this.msg = msg || 'ok';
        this.errorCode = 0;
    }
}

class NotFound extends HttpExcePtion {
    constructor(msg, errorCode) {
        super();
        this.code = 404;
        this.msg = msg || '资源未找到';
        this.errorCode = 1000;
    }
}

class AuthFailed extends HttpExcePtion {
    constructor(msg, errorCode) {
        super();
        this.code = 401;
        this.msg = msg || '授权失败';
        this.errorCode = 10004;
    }
}

class Forbbiden extends HttpExcePtion {
    constructor(msg, errorCode) {
        super();
        this.code = 403;
        this.msg = msg || '禁止访问';
        this.errorCode = 10006;
    }
}


class LikeError extends HttpExcePtion {
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || '你已经点赞过';
        this.errorCode = 10006;
    }
}

class DisLikeError extends HttpExcePtion {
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || '你已取消点赞';
        this.errorCode = 10006;
    }
}

module.exports = {
    HttpExcePtion,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DisLikeError
}