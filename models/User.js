const { DataTypes } = require('sequelize');
const { hashPassword } = require('../utils/token');

const sequelize = require('../config/sequelize');
const tableName = 'User';

const User = sequelize.define(tableName, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    },
    resetToken: {
        type: DataTypes.STRING
    },
    resetTokenExpires: {
        type: DataTypes.DATE
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await hashPassword(user.password);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await hashPassword(user.password);
            }
        }
    }
});

(async () => {
    let opt =  process.env.APP_PRODUCTION_MODE === true ? { alter: true, force: true } : { alter: false };
    await sequelize.sync(opt);
    console.log(`Synchronisation de la table "${tableName}" effectuée avec succès !`);
})();

module.exports = User;