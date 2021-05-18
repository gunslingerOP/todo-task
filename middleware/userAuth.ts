import * as jwt from "jsonwebtoken";
import { errRes } from "../utility/helpers";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
let Authenticate: any;
export default Authenticate = async (req, res, next): Promise<object> => {
  let payload: any;
  const token = req.headers.token;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return errRes(res, `token is not valid`);
  }
  let user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });
  if (!user)
    return errRes(
      res,
      `User does not exist, please complete the registration process.`
    );
  req.user = user;

  return next();
};
