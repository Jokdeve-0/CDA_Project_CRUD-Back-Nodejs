const jwt = require('jsonwebtoken')

class HandlerCookie {
  async generateToken(user) {
    return {
        token: jwt.sign({
            id: user.id,
            role: user.role_id
        }, "RANDOM_TOKEN_SECRET", {
            expiresIn: '24h'
        })
    };
  }

  async attachCookieToResponse({ res, user }) {
    const month = 1000 * 60 * 60 * 24 * 30;
    const token = await this.generateToken(user);
    res.cookie('token', token, {
      // httpOnly: true,
      expires: new Date(Date.now() + month),
      secure: process.env.NODE_ENV !== 'development',
      domain: process.env.DOMAIN_NAME,
    });

    res.status(200).json({
        user: {
            id: user.id,
            username: user.username,
            mail: user.mail,
            roleId: user.roleId,
            token: token
        },
        message: 'Logged in successfully : 🟢'
    })
  }
}
const handlerCookie = new HandlerCookie();
module.exports = handlerCookie;
