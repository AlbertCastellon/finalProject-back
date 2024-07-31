const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (err) {
        console.error(err);
    }
}

async function comparePassword(myPlaintextPassword, hash) {

    const permiso = await bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        return result
    });
    return permiso
}



module.exports = { hashPassword, comparePassword }