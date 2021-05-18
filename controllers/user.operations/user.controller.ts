import * as validate from "validate.js";
import * as jwt from "jsonwebtoken";
import validator from "../../utility/validation";
import {
  comparePassword,
  errRes,
  hashMyPassword,
  okRes,
} from "../../utility/helpers";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserController {
  /**
   *
   * This function adds a todo
   *
   * @requires unique_username
   *
   * @requires password
   *
   * @returns the created user
   */

  static register = async (req, res) => {
    //Check the req data validity
    let body = req.body;
    let notValid = validate(body, validator.register());

    if (notValid) return errRes(res, notValid);

    //check if user exists
    let userExists = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (userExists) return errRes(res, `${body.username} is taken`);

    //Encrypting password and adding user to db

    let password = await hashMyPassword(body.password);

    let user = await prisma.user.create({
      data: {
        username: body.username,
        password,
      },
    });
    user.password = null;

    //creating a user token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return okRes(res, { user, token });
  };
}
