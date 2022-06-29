import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createUserController } from "../useCases/CreateUser";

const router = Router();

router.post(
  "/",
  checkSchema({
    name: { isString: true, notEmpty: true },
    email: { isEmail: true, normalizeEmail: true, notEmpty: true },
    password: { isString: true, notEmpty: true },
    phone: { isString: true, notEmpty: true },
  }),
  async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    return await createUserController.handle(request, response, next);
  }
);

export default router;
