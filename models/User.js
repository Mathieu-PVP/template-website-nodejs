const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../config/sequelize');
const tableName = 'User';

const User = sequelize.define(tableName, {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }
    }
});

(async () => {
    let opt =  process.env.APP_PRODUCTION_MODE === true ? { alter: true } : { alter: false };
    await sequelize.sync(opt);
    console.log(`Synchronisation de la table "${tableName}" effectuée avec succès !`);
})();

module.exports = User;