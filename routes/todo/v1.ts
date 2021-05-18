import * as express from "express";
import Todocontroller from "../../controllers/todo.operations/todo.controller";
import userAuth from "../../middleware/userAuth";

const router = express.Router();

router.post("/todos", userAuth, Todocontroller.addTodo);
router.delete("/todos/:todoId", userAuth, Todocontroller.removeTodo);
router.put("/todos/:todoId", userAuth, Todocontroller.updateTodo);

export default router;
