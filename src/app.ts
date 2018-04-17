///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import index from "./routes/index";
import get from "./routes/get";
import post from "./routes/post";

export class Server {
    public app: express.Application;

    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }


    public config() {
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
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            res.status(err.status || 500);
            res.render('error');
        });
    }

    private routes() {
        // let router: express.Router;
        // router = express.Router();

        this.app.use('/', index);
        this.app.use('/get',get);
        this.app.use('/post',post);

        // indexRoute.create(router);
        //use router middleware
        // this.app.use(router);
    }

    public api() {
    }
}