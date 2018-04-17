"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../node_modules/@types/node/index.d.ts"/>
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var index_1 = require("./routes/index");
var get_1 = require("./routes/get");
var post_1 = require("./routes/post");
var Server = /** @class */ (function () {
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
    }
    Server.prototype.config = function () {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        //mount logger
        this.app.use(logger("dev"));
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //mount cookie parser middleware
        this.app.use(cookieParser());
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(function (err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        });
    };
    Server.prototype.routes = function () {
        // let router: express.Router;
        // router = express.Router();
        this.app.use('/', index_1.default);
        this.app.use('/get', get_1.default);
        this.app.use('/post', post_1.default);
        // indexRoute.create(router);
        //use router middleware
        // this.app.use(router);
    };
    Server.prototype.api = function () {
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=app.js.map