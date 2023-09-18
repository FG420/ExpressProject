import { Request, Response, NextFunction } from 'express';
import { TypedRequest } from '../../utils/typed-request.interface';
import { NotFoundTodoError } from '../../errors/not-found-todo';
import todoService from './todos.service';
import { AddTodosDTO, AssignDTOBody, AssignDTOParams, ListDTO, SetChecked } from './todos.dto';
import { Todo } from './todos.entity';


export const list = async (req: TypedRequest<any, ListDTO, any>, res: Response, next: NextFunction) => {
    const user = req.user!;
    const list = await todoService.find(user.id!);
    res.json(list);
}

export const add = async (req: TypedRequest<AddTodosDTO>, res: Response, next: NextFunction) => {
    try {
        const user = req.user!;
        const { title, dueDate, assignedTo } = req.body;
        const newT: Todo = {
            title,
            dueDate,
            assignedTo,
        };
        const savedT = await todoService.add(newT, user.id!);
        res.json(savedT);
    } catch (err) { next(err); }
}

export const checkedTodo = async (req: TypedRequest<any, any, SetChecked>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const updated = await todoService.update(id, { completed: false });
        res.json(updated);
    } catch (err) { next(err) }
}

export const uncheckedTodo = async (req: TypedRequest<any, any, SetChecked>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const updated = await todoService.update(id, { completed: true });
        res.json(updated);
    } catch (err) { next(err) }
}

export const assignedTo = async (req: TypedRequest<AssignDTOBody,any, AssignDTOParams >, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
        const assignedToUser = req.body.userId;
        const updated = await todoService.update(id, { assignedTo: assignedToUser});
        res.json(updated);
    } catch (err){ next(err) }
}
