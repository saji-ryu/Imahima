"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../node_modules/@types/node/index.d.ts"/>
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var session = require("express-session");
var passport = require("passport");
var passport_twitter = require("passport-twitter");
var mongoose = require("mongoose");
var TwitterStrategy = passport_twitter.Strategy;
var home_1 = require("./routes/home");
var oauth_1 = require("./routes/oauth");
var newuser_1 = require("./routes/newuser");
var watch_1 = require("./routes/watch");
var api_1 = require("./routes/api");
require('dotenv').config();
var TWITTER_CONSUMER_KEY = process.env.TW_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TW_CONSUMER_SECRET;
var port = Number(process.env.PORT) || 3000;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/imahima';
var tw_callback = "http://127.0.0.1:3000/oauth/twitter/callback";
//const tw_callback:string = "https://imahima.herokuapp.com/oauth/twitter/callback";
//passport
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: tw_callback //Twitterログイン後、遷移するURL
}, function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
        console.log(profile); //必要に応じて変更
        return done(null, profile);
    });
}));
//express
var app = express();
app.use(express.static(path.join(__dirname, "../public")));
//view settings
app.set("views", "views/");
app.set("view engine", "pug");
//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    }
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
//catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    err.status = 404;
    next(err);
});
//error handling
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
//router
app.use('/', home_1.default);
app.use('/oauth', oauth_1.default);
app.use('/newuser', newuser_1.default);
app.use('/watch', watch_1.default);
app.use('/api', api_1.default);
//server
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
    mongoose.connect(mongoURI, function () {
        console.log('connected to mongo');
    });
});
//# sourceMappingURL=app.js.map