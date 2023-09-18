import { NextFunction, Request, Response } from "express";



export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction)=>{
    console.error(err)
    res.status(500);
    res.json({
        error : 'Server Error',
        message : 'response not possible with server'
    });

}
