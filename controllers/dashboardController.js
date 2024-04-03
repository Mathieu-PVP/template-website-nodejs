const dashboardView = (req, res) => {
    res.render('dashboard', { pageTitle: 'dashboard' });
};

module.exports = {
    dashboardView
};