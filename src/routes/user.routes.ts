import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { authJWT } from "../middleware/auth";
import { createUserController } from "../useCases/CreateUser";
import { loginUserController } from "../useCases/LoginUser";

const router = Router();

router.post(
  "/",
  authJWT,
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

router.post("/login", checkSchema({
  email: { isString: true },
  password: { isString: true }
}),
  async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    return await loginUserController.handle(request, response, next);
  })

export default router;
