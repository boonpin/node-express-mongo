import {NextFunction, Request, Response} from "express";
import {UnauthorizedError} from "../errors/unauthorized-error";

export class AdminAuthMiddleware {
    public handle(req: Request, res: Response, next: NextFunction): void {
        if (!req.session.user) {
            throw new UnauthorizedError()
        } else {
            next();
        }
    }
}
