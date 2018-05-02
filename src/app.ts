///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as session from "express-session";
import * as passport from "passport";
import * as passport_twitter from "passport-twitter";
import * as mongoose from "mongoose";

const TwitterStrategy = passport_twitter.Strategy;

import home from "./routes/home";
import oauth from "./routes/oauth";

require('dotenv').config();

const TWITTER_CONSUMER_KEY = process.env.TW_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TW_CONSUMER_SECRET;


const port: number = Number(process.env.PORT) || 3000;

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
    },
    function (token, tokenSecret, profile, done) {
        process.nextTick(function () {
            console.log(profile); //必要に応じて変更
            return done(null, profile);
        });
    }
));


const app = express();

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
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    err.status = 404;
    next(err);
});

//error handling
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
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
app.use('/', home);
app.use('/oauth', oauth);


//server
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
    mongoose.connect('mongodb://localhost/imahima',()=>{
        console.log('connected to mongo');
    });
});