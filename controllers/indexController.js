const indexView = (req, res) => {
    res.render('index', { pageTitle: 'Accueil' });
};

module.exports = {
    indexView
};