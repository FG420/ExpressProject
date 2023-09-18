import { TodoModel } from "./todos.model";
import { Todo } from "./todos.entity";
import { NotFoundTodoError } from "../../errors/not-found-todo";
import { assign } from "lodash";

export class TodoService {
    async find(userId: string, showCompleted: boolean): Promise<Todo[]>;
    async find(userId: string): Promise<Todo[]>;
    async find(userId: string, showCompleted: boolean = false): Promise<Todo[]> {
        const now = new Date();
        const filter: any = {
            $or: [{ createdBy: userId }, { assignedTo: userId }],
        };
        if (!showCompleted) {
            filter.completed = false;
        }
        const listWithDueDate = await TodoModel.find({
            ...filter,
            dueDate: { $exists: true, $ne: null },
        })
            .populate("createdBy assignedTo")
            .sort({ dueDate: 1, createdAt: 1 });
        const listWithoutDueDate = await TodoModel.find({
            ...filter,
            dueDate: { $exists: false },
        })
            .populate("createdBy assignedTo")
            .sort({ createdAt: 1 });
        return [...listWithDueDate, ...listWithoutDueDate];
    }


    async add(todo: Todo, createdBy: string): Promise<Todo> {
        const newT = await TodoModel.create({ ...todo, createdBy: createdBy });
        await newT.populate("createdBy assignedTo");
        return newT;
    }
    private async _getById(id: string) {
        return TodoModel.findOne({ _id: id }).populate("createdBy assignedTo");
    }

    async update(id: string, data: Partial<Todo>): Promise<Todo> {
        const item = await this._getById(id);
        if (!item) {
            throw new NotFoundTodoError();
        }
        assign(item, data);
        await item.save();
        return this._getById(id) as Promise<Todo>;
    }

}


export default new TodoService();