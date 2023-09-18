import { Types } from "mongoose";
import { User } from "../user/user.entity";

export interface Todo {
    id?: string;
    title: string;
    dueDate?: Date;
    completed?: boolean;
    expired?: boolean;
    createdBy?: Types.ObjectId | string | User;
    assignedTo?: Types.ObjectId | string | User;
}