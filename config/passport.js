const { Strategy } = require('passport-local');
const { compareHash } = require('../utils/token');

const User = require('../models/User');

const loginAuth = (passport) => {
    passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) { return done(null, false, { message: 'Aucun utilisateur n\'a été trouvé avec cet e-mail !' }); }

            const isMatch = await compareHash(password, user.password);
            if (isMatch) { return done(null, user); }
            else { return done(null, false, { message: 'Mot de passe incorrect !' }); }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

module.exports = {
    loginAuth,
};