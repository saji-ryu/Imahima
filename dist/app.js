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
require('dotenv').config();
var TWITTER_CONSUMER_KEY = process.env.TW_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TW_CONSUMER_SECRET;
var port = Number(process.env.PORT) || 3000;
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/oauth/twitter/callback" //Twitterログイン後、遷移するURL
}, function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
        console.log(profile); //必要に応じて変更
        return done(null, profile);
    });
}));
var app = express();
app.use(express.static(path.join(__dirname, "public")));
//configure pug
// app.set("views", path.join(__dirname, "views"));
app.set("views", "views/");
app.set("view engine", "pug");
//mount logger
app.use(logger("dev"));
//mount json form parser
app.use(bodyParser.json());
//mount query string parser
app.use(bodyParser.urlencoded({
    extended: true
}));
//mount cookie parser middleware
app.use(cookieParser());
// catch 404 and forward to error handler
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
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//router
app.use('/', home_1.default);
app.use('/oauth', oauth_1.default);
//server
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
    mongoose.connect('mongodb://localhost/imahima', function () {
        console.log('connected to mongo');
    });
});
//# sourceMappingURL=app.js.map