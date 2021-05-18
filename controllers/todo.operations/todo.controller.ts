import * as validate from "validate.js";
import validator from "../../utility/validation";
import { errRes, okRes } from "../../utility/helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Todocontroller {
  /**
   *
   * This function adds a todo
   *
   * @requires title
   * @requires description
   * @requires category
   *
   * @returns the created todo
   */

  static addTodo = async (req, res) => {
    //Getting user and request body
    let user = req.user;
    let user_id = user.id;
    let body = req.body;

    //Validating request data
    let notValid = validate(body, validator.todo());
    if (notValid) return errRes(res, notValid);

    //check if category exists

    let category = body.categoryId;
    let categoryExists = await prisma.category.findUnique({
      where: {
        id: body.categoryId,
      },
    });

    if (!categoryExists) return errRes(res, `No category with that ID!`);

    //Add todo task
    let task = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        user_id,
        category_id: category,
      },
    });
    return okRes(res, task);
  };

  /**
   *
   * This function adds a todo
   *
   * @requires todo's ID
   *
   *
   */

  static removeTodo = async (req, res) => {
    let user = req.user;
    let todoId = parseInt(req.params.todoId);

    //check if todo exists and belongs to user

    let task = await prisma.todo.findFirst({
      where: {
        id: todoId,
        user_id: user.id,
      },
    });

    if (!task) return errRes(res, `No todo with such and ID!`);

    await prisma.todo.delete({
      where: {
        id: task.id,
      },
    });

    return okRes(res, `Todo removed successfully`);
  };

  /**
   *
   * This function adds a todo
   *
   * @requires updated_status
   *
   * @returns the updated todo
   */

  static updateTodo = async (req, res) => {
    let user = req.user;
    let body = req.body;
    let todoId = parseInt(req.params.todoId);
    //Validating request data
    let notValid = validate(body, validator.updateTodo());
    if (notValid) return errRes(res, notValid);

    //check if todo exists and belongs to user
    let task = await prisma.todo.findFirst({
      where: {
        id: todoId,
        user_id: user.id,
      },
    });

    if (!task) return errRes(res, `No todo with such and ID!`);

    //update the status and return the new todo
    await prisma.todo
      .update({
        where: {
          id: task.id,
        },
        data: {
          status: body.newStatus,
        },
      })
      .then(async () => {
        task = await prisma.todo.findFirst({
          where: {
            id: todoId,
            user_id: user.id,
          },
        });
        return okRes(res, task);
      });
  };
}
