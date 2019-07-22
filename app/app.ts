import {Request, Response, NextFunction} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as mongoose from "mongoose";

import {Routes} from "./routes/routes";

import {AdminAuthMiddleware} from "./middleware/admin-auth";
import {UnauthorizedError} from "./errors/unauthorized-error";
import {Logger} from "./logger";
import {NotFoundError} from "./errors/not-found-error";


class App {
    public app = express();

    private routes: Routes;

    private mongoUrl: string = 'mongodb://192.168.168.101:27017/payments';

    private middleware = {
        'admin': (new AdminAuthMiddleware()).handle
    };

    private logger = Logger.logger();

    constructor() {
        this.app.use(cookieParser());
        this.app.use(session({
            secret: 'abcd1234',
            resave: false,
            saveUninitialized: false
        }));

        this.config();
        this.setupMongo();
        this.setupMiddleware();
        this.routes = new Routes(this);

        this.setupErrorHandler();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        // serving static files
        this.app.use(express.static('public'));
    }

    private setupMongo(): void {
        // @ts-ignore
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true}).then(() => {
            return this.logger.info(`Successfully connected to ${this.mongoUrl}`);
        }).catch(error => {
            this.logger.error('Error connecting to database: ', error);
            return process.exit(1);
        });
        //mongoose.connection.on('disconnected', connect);
    }

    private setupMiddleware(): void {
        this.app.use('/api/**', this.middleware.admin);
    }

    private setupErrorHandler(): void {
        this.app.use(methodOverride());
        this.app.use((err, req: Request, res: Response, next) => {
            err.req = {
                ip: req.ip,
                agent: req.headers.agent,
                method: req.ip,
                url: req.originalUrl
            };

            if (err instanceof UnauthorizedError || NotFoundError) {
                Logger.logger().info(err.message);
            } else {
                Logger.logger().error(err);
            }
            res.status(err.status || 500);
            res.json({message: err.message || "Oops, Something not working."});
        });
    }
}

export default new App().app;
