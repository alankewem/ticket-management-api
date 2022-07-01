import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  async common(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, email, password, phone } = req.body;

    try {
      const user = await this.createUserUseCase.execute({ name, email, password, phone, role: "common" }).catch(error => {
        res.status(400).json({ error: error })
      })
      return res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error || "Unexpected error" });
    }
  }

  async admin(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, email, password, phone, role } = req.body;

    try {
      const user = await this.createUserUseCase.execute({ name, email, password, phone, role }).catch(error => {
        res.status(400).json({ error: error })
      })
      return res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error || "Unexpected error" });
    }
  }
}
