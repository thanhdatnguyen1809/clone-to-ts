import { CustomError } from "./custom-error";
import { GeneralError } from "./Error";


export class BadRequest extends CustomError {
    constructor(message: string) {
        super(message, 400);
        
        
    }
}