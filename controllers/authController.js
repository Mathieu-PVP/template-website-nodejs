const passport = require('passport');

const User = require("../models/User");

const loginView = (req, res) => {
    res.render('login', { pageTitle: 'Se connecter', email: '', password: '' });
};

const loginUser = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('error', 'Veuillez remplir tous les champs requis !');
        return res.render('login', { pageTitle: 'Se connecter', ...req.body });
    }

    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(req, res, next);
};

const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', 'Une erreur est survenue lors de la déconnexion !');
            return res.redirect('/');
        }
        req.flash('success', 'Vous avez été déconnecté !');
        res.redirect('/auth/login');
    });
};

const registerView = (req, res) => {
    res.render('register', { pageTitle: 'S\'enregistrer', lastName: '', firstName: '', email: '', password: '' });
};

const registerUser = async (req, res) => {
    const { lastName, firstName, email, password } = req.body;

    try {
        if (!lastName || !firstName || !email || !password) {
            req.flash('error', 'Veuillez remplir tous les champs requis');
            return res.render('register', { pageTitle: 'S\'enregistrer', ...req.body });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash('error', 'Un utilisateur avec cet email existe déjà !');
            return res.render('register', { pageTitle: 'S\'enregistrer', ...req.body });
        }

        await User.create({ ...req.body });

        req.flash('success', 'Votre compte a bien été créé !');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', 'Un utilisateur avec cet email existe déjà !');
        return res.render('register', { pageTitle: 'S\'enregistrer', ...req.body });
    }
};

module.exports = {
    loginView,
    registerView,
    loginUser,
    logoutUser,
    registerUser
};