import * as validate from "validate.js";
import validator from "../../utility/validation";
import { errRes, okRes, paginate } from "../../utility/helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class DataController {
  /**
   *
   * This function gets the user's todos
   *
   *
   */

  static getUserTodos = async (req, res) => {
    //Getting user and body from req
    let user = req.user;
    let body = req.body;

    //Getting todos of user
    let todos = await prisma.todo.findMany({
      where: {
        user,
      },
    });

    if (Object.keys(todos).length == 0) {
      return errRes(
        res,
        `You have no todos, time to get busy and create some!`
      );
    }

    return okRes(res, todos);
  };

  /**
   *
   * This function gets the categories to which the user can assign todos
   *
   * @returns categories paginated
   */

  static getCategories = async (req, res) => {
    let { p, s } = req.query;

    let { skip, take } = paginate(p, s);

    let categories = await prisma.category.findMany({
      skip,
      take,
    });

    return okRes(res, { categories, p, s });
  };

  /**
   *
   * This function gets user todos according to a given category
   *
   * @requires categoryId
   *
   * @returns categories paginated
   */

  static filterByCategory = async (req, res) => {
    let user = req.user;
    let categoryId = parseInt(req.params.categoryId);
    let { p, s } = req.query;

    let { skip, take } = paginate(p, s);

    //check if category exists
    let category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) return errRes(res, `No such category exists`);

    //get the todos of user in the specified category
    let todos = await prisma.todo.findMany({
      skip,
      take,
      where: {
        user_id: user.id,
        category_id: category.id,
      },
    });

    return okRes(res, todos);
  };
}
