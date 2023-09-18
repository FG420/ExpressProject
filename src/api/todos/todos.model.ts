import { Schema, model } from "mongoose";
import { Todo as iTodo } from "./todos.entity";

export const todoSchema = new Schema<iTodo>({
    title: String,
    dueDate: Date,
    completed: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' }
});


todoSchema.pre('findOne', function(next) {
    this.populate('createdBy');
    this.populate('assignedTo');
    next();
});

todoSchema.virtual('expired').get(function() {
if (!this.dueDate) {
    return undefined;
} else {
    const currentDate = new Date();
    const dueDate = new Date(this.dueDate);

    if (currentDate > dueDate) {
        return true;
    } else {
        return false;
    }
}
});


todoSchema.set('toJSON', {
virtuals: true,
transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
}
});

todoSchema.set('toObject', {  
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const TodoModel = model<iTodo>('Todo', todoSchema);