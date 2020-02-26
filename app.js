const express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    methodeOverride = require("method-override"),
    flash = require("connect-flash"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

//Modelos
const User = require("./models/user");

// Rotas
const authRoute = require("./routes/auth"),
    curriculumRoute = require("./routes/curriculum");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect("mongodb+srv://debs:debs123@cluster0-reqme.mongodb.net/test?retryWrites=true&w=majority", options).catch(err => console.log(`Error ao conectar no banco de dados:\n${err}`));
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodeOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "case_lct",
    resave: false,
    saveUninitialized: false,
    cookie: { _expires: 5000000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    
    next();
});

app.use(authRoute);
app.use("/curriculum", curriculumRoute);
app.use("/", (req, res) => {
    res.render("main");
});

app.listen(8080, '0.0.0.0', function() {
    console.log("Server started.");
    User.register({
        username: "admin"
    }, 'admin123', (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(user);
        }
    });
});