export class ErrorHandler extends Error{
    constructor( message = "Something went wrong", statusCode){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}