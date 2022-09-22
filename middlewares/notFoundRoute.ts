import { Request, Response, NextFunction } from "express";
export const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ message: "Not found that route" });
}