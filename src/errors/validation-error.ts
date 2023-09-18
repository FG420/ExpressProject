import { ValidationError as OriginalValidationErrors} from "class-validator";
import { NextFunction, Request, Response } from "express";
// import { AddCartItemDTO } from "../api/cart-item/cart-item.dto";

// const addCart = new AddCartItemDTO();

export class valError extends Error{

    constructor( public originalErrors : OriginalValidationErrors[])
    {
        super();
        this.name = "Validation Error",
        this.message = originalErrors.map(err => Object.values(err.constraints as any)).flat().join('; ');                
    }
}


export const validationErrorHandeler = (err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof valError){
        res.status(400);
        res.json({
            "name" : err.name,
            "message" : err.message,
            "details" : err.originalErrors.map(err => ({
                property : err.property,
                constraints : err.constraints,
                value : err.value
            }))
        })
    }else{
        next(err);
    }
}