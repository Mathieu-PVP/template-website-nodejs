const isConnected = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }
    else { return res.redirect('/auth/login'); }
};

const isDeconnected = (req, res, next) => {
    if (!req.isAuthenticated()) { return next(); }
    else { return res.redirect('/'); }
};

module.exports = {
    isConnected,
    isDeconnected
};