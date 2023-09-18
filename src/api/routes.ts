import { Router } from 'express';
import todoRouter from '../api/todos/todos.router';
import userRouter from '../api/user/user.router';

const router = Router();

router.use('/todos', todoRouter);
router.use('/user', userRouter);


export default router;