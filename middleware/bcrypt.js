const bcrypt = require('bcrypt')

exports.encryptedPassword = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(req.body.password, salt);
    // Store hash in the database
    console.log("hash",password);
    
    next();
}
