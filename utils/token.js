const crypto = require('crypto');
const bcrypt = require('bcrypt');

const generateToken = (int) => {
    const randomBytes = crypto.randomBytes(int || 32);
    return randomBytes.toString('hex');
};

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword.toString();
};

const compareHash = async (string, hash) => {
    const isMatch = await bcrypt.compare(string, hash);
    return isMatch;
}

module.exports = {
    generateToken,
    hashPassword,
    compareHash
};
