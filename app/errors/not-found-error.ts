export class NotFoundError implements Error {

    status: number = 404;

    name: string = "Resource Not Found";
    message: string;
    stack?: string;

    constructor(message?, stack?) {
        this.message = message || "Resource Not Found";
        this.stack = stack;
    }
}
