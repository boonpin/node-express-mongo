import {Request, Response, NextFunction} from "express";

import {AuthController} from "../controllers/auth";

export class Routes {

    private context;

    constructor(context) {
        this.context = context;
        this.configure();
    }

    public configure(): void {
        const express = this.context.app;

        express.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'success'
            });
        });

        express.route('/auth/login').get(AuthController.login);
        express.route('/auth/validate').get(AuthController.validate);
        express.route('/auth/logout').get(AuthController.logout);
    }
}
