import { NextFunction, Request, Response } from "express";

export class NotFoundTodoError extends Error{
    constructor(){
        super();
        this.name = 'NotFoundTodoError';
        this.message = 'Task Not Found';
    }
}

export const notFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof NotFoundTodoError){
        res.status(404);
        res.json({
            error: err.name,
            message: err.message
        });
    } else {
        next(err);
    }
}
