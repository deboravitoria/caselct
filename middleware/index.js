const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        next();
    else {
        req.flash("error", "Faça o login para acesso.");
        res.redirect("/login");
    }
};

middlewareObj.isNotLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated())
        return next();

    res.redirect("/curriculum/lista");
};

module.exports = middlewareObj;