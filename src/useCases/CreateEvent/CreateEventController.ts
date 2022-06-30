import { NextFunction, Request, Response } from "express";
import { CreateEventUseCase } from "./CreateEventUseCase";

export class CreateEventController {
    constructor(private createEventUseCase: CreateEventUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { title, description, eventDate, price, ticketsAvailable, address } = req.body;

        try {
            const event = await this.createEventUseCase.execute({ title, description, eventDate, price, ticketsAvailable, address }).catch(error => {
                res.status(400).json({ error: error })
            })
            return res.status(201).json(event);
        } catch (error) {
            res.status(500).json({ error: error || "Unexpected error" });
        }
    }
}
