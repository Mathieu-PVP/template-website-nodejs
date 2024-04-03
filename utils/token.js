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

const compareHash = async (hash1, hash2) => {
    const isMatch = await bcrypt.compare(hash1, hash2);
    return isMatch;
}

module.exports = {
    generateToken,
    hashPassword,
    compareHash
};