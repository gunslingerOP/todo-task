import * as express from "express";
import DataController from "../../controllers/data.getter/data.controller";
import userAuth from "../../middleware/userAuth";

const router = express.Router();

router.get("/todos", userAuth, DataController.getUserTodos);
router.get("/categories", DataController.getCategories);
router.get("/todos/:categoryId", userAuth, DataController.filterByCategory);

export default router;
