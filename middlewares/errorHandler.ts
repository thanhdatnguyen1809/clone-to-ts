import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json(err.message);
    }
    return res.status(500).json({ message: "something went wrong" });
}