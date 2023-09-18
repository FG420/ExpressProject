import { NextFunction, Request, Response } from "express";
import { NotFoundTodoError } from "../errors/not-found-todo";
import { TodoModel } from "../api/todos/todos.model";
import { TypedRequest } from "./typed-request.interface";
import { UserNotFound } from "../errors/not-found-user";
import { valError } from "../errors/validation-error";

export const validationLogin = (type: "two" | "one" = "two") => {
    return async (req: TypedRequest<any, any, any>, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const todoId = req.params.id;
        const q: any = { createdBy: userId };
        if (type === "two") { q.$or = [{ assignedTo: userId }, { _id: todoId }]; } else { q._id = todoId; }
        try {
            const todo = await TodoModel.findOne(q);
            if (todo) { next(); } 
            else {
                throw new valError([
                    {
                        property: "Todo",
                        constraints: {
                            notexist: "You cannot edit this Todo or this Todo does not exist.",
                        },
                        value: todoId,
                    },
                ]);
            }
        } catch (err) { next(err); }
    };
};
