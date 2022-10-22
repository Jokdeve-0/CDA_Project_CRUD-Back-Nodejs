const jwt = require('jsonwebtoken')

class HandlerCookie {
  async generateToken(user) {
    return {
        token: jwt.sign({
            id: user[0].id,
            role: user[0].role
        }, "RANDOM_TOKEN_SECRET", {
            expiresIn: '24h'
        })
    };
  }

  async attachCookieToResponse({ response, user }) {
    const month = 1000 * 60 * 60 * 24 * 30;
    const token = await this.generateToken(user);

    response.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + month),
      secure: process.env.NODE_ENV !== 'development',
    });
  }
}
const handlerCookie = new HandlerCookie();
module.exports = handlerCookie;
