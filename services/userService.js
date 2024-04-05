const User = require('../models/User');

const findUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (userId, userData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        await user.update(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        await user.destroy();
    } catch (error) {
        throw error;
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        throw error;
    }
};

const findUserByResetToken = async (resetToken) => {
    try {
        const user = await User.findOne({ where: { resetToken } });
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findUser,
    createUser,
    updateUser,
    deleteUser,
    findUserByEmail,
    findUserByResetToken
};