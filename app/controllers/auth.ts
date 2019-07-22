import * as bcrypt from 'bcrypt';

import {Request, Response} from 'express';

import {User, IUser} from '../models/user';
import {UnauthorizedError} from "../errors/unauthorized-error";

import {Logger} from '../logger';

export class AuthController {

    static login(req: Request, res: Response) {
        User.findOne({username: req.query.username}, (err, user) => {
            if (user) {
                //TODO: compare password
                if (bcrypt.compareSync(req.query.password, user.password)) {
                    delete user.password;
                    req.session.user = user;
                    res.json(user);
                    Logger.logger().info("user [" + user.username + "] logged from ip [" + req.ip + "]");
                } else {
                    Logger.logger().info("user [" + user.username + "] login failed from ip [" + req.ip + "]");
                    throw new UnauthorizedError("Invalid login credential!");
                }
            } else {
                throw new UnauthorizedError("Invalid login credential!");
            }
        });
    }

    static validate(req: Request, res: Response) {
        if (req.session.user) {
            res.json({valid: true});
        } else {
            res.json({valid: false});
        }
    }

    static logout(req: Request, res: Response) {
        req.session.user = null;
        res.json({success: true});
    }
}
