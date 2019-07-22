export class UnauthorizedError implements Error {

    status: number = 401;

    name: string = "Unauthorized";
    message: string;
    stack?: string;

    constructor(message?, stack?) {
        this.message = message || "Unauthorized";
        this.stack = stack;
    }
}
