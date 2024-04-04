const passport = require('passport');
const { Op } = require('sequelize');
const { generateToken, compareHash } = require('../utils/token');

const User = require('../models/User');

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

const forgotPasswordView = (req, res) => {
    res.render('forgot-password', { pageTitle: 'Mot de passe oublié', email: req.body.email || '' });
};

const forgotPasswordUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            req.flash('error', 'Adresse e-mail non-trouvée');
            res.render('forgot-password', { pageTitle: 'Mot de passe oublié', email: req.body.email || '' });
        }

        const resetToken = await generateToken();
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000;

        await user.save();

        const hostname = (req.hostname === 'localhost' || req.hostname === '127.0.0.1') ? `${req.hostname}:${process.env.PORT || 3000}` : req.hostname;
        req.mailer_transporter.sendMail({
            from: process.env.MAILER_SMTP_AUTH_USER,
            to: req.body.email,
            subject: 'Réinitialisation de mot de passe',
            text: `Vous avez demandé une réinitialisation de mot de passe. Veuillez suivre ce lien pour réinitialiser votre mot de passe : http://${hostname}/auth/reset-password?token=${resetToken}`
        }, (error, info) => {
            if (error) {
                req.flash('error', 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail de réinitialisation de mot de passe !');
                res.redirect('/auth/forgot-password');
            } else {
                console.log('E-mail envoyé:', info.response);
                req.flash('success', 'Un e-mail de réinitialisation de mot de passe vous a été envoyé !');
                res.redirect('/auth/forgot-password');
            }
        });
    } catch (error) {
        req.flash('error', 'Une erreur s\'est produite lors de la réinitialisation du mot de passe !');
        res.redirect('/auth/forgot-password');
    }
};

const resetPasswordView = async (req, res) => {
    const user = await User.findOne({ where: { resetToken: req.query.token, resetTokenExpires: { [Op.gt]: Date.now() } } });

    if (!user) {
        req.flash('error', 'Lien de réinitialisation de mot de passe invalide ou expiré !');
        return res.redirect('/auth/forgot-password');
    }

    res.render('reset-password', { pageTitle: 'Réinitialiser mot de passe', token: req.query.token });
};

const resetPasswordUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { resetToken: req.query.token, resetTokenExpires: { [Op.gt]: Date.now() } } });

        if (!user) {
            req.flash('error', 'Lien de réinitialisation de mot de passe invalide ou expiré !');
            return res.redirect('/auth/forgot-password');
        }

        if (req.body.password !== req.body.confirmPassword) {
            req.flash('error', 'Les mots de passe ne correspondent pas !');
            return res.redirect('/auth/reset-password?token=' + req.query.token);
        }

        if (req.body.password.trim() === '') {
            req.flash('error', 'Le mot de passe ne peut pas être vide !');
            return res.redirect('/auth/reset-password?token=' + req.query.token);
        }

        const isMatch = await compareHash(req.body.password, user.password);
        if (isMatch) {
            req.flash('error', 'Le nouveau mot de passe ne peut pas être le même que celui actuel !');
            return res.redirect('/auth/reset-password?token=' + req.query.token);
        }

        user.password = req.body.password;
        user.resetToken = null;
        user.resetTokenExpires = null;
        await user.save();

        req.flash('success', 'Mot de passe réinitialisé avec succès !');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', 'Une erreur s\'est produite lors de la réinitialisation du mot de passe !');
        res.redirect('/auth/forgot-password');
    }
};

module.exports = {
    loginView,
    registerView,
    loginUser,
    logoutUser,
    registerUser,
    forgotPasswordView,
    forgotPasswordUser,
    resetPasswordView,
    resetPasswordUser
};
