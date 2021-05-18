import * as express from "express";
import Todocontroller from "../../controllers/todo.operations/todo.controller";
import userAuth from "../../middleware/userAuth";

const router = express.Router();

router.post("/add", userAuth, Todocontroller.addTodo);
router.delete("/delete", userAuth, Todocontroller.removeTodo);
router.put("/update", userAuth, Todocontroller.updateTodo);

export default router;
