import { NextFunction, Request, Response } from "express";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await this.loginUserUseCase.execute({email, password}).catch(error=> {
        res.status(400).json({error: error})
      })
      return res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error || "Unexpected error" });
    }
  }
}
