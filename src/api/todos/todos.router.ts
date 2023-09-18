import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { add, assignedTo, checkedTodo, list, uncheckedTodo } from "./todos.controller";
import { AddTodosDTO, AssignDTOBody, AssignDTOParams, ListDTO, SetChecked } from "./todos.dto";
import { validate } from "../../utils/validation.middleware";
import { validationLogin } from "../../utils/login-validator";

const router = Router();

router.use(isAuthenticated);
router.get('/', validate(ListDTO, 'query'), list);
router.post('/', validate(AddTodosDTO, "body"), add);
router.patch('/:id/check', validationLogin("two"), validate(SetChecked, 'params'), checkedTodo);
router.patch('/:id/uncheck', validationLogin("two"), validate(SetChecked, 'params'), uncheckedTodo);
router.post('/:id/assignTo', validationLogin("one"), validate(AssignDTOBody, 'body'), validate(AssignDTOParams, 'params'), assignedTo);

export default router; 