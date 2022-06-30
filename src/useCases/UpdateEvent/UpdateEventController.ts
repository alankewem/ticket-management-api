import { NextFunction, Request, Response } from "express";
import { UpdateEventUseCase } from "./UpdateEventUseCase";

export class UpdateEventController {
    constructor(private updateEventUseCase: UpdateEventUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { title, description, eventDate, price, ticketsAvailable, address, id, createdAt, } = req.body;

        try {
            const event = await this.updateEventUseCase.execute({
                title, description, eventDate, price, ticketsAvailable, address, id
            }).catch(error => {
                res.status(400).json({ error: error })
            })
            return res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ error: error || "Unexpected error" });
        }
    }
}
