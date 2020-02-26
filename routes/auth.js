const express = require("express");
const router = express.Router();
const passport = require("passport");
const middleware = require("../middleware/index");

router.get("/login", middleware.isNotLoggedIn, function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/curriculum/lista",
    failureRedirect: "/login",
    failureFlash: "Conta ou senha inválida."
}), function(req, res) {});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Saiu da conta com sucesso.");
    res.redirect("/login");
});

module.exports = router;
