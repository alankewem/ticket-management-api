import { NextFunction, Request, Response } from "express";
import { BuyTicketUseCase } from "./BuyTicketUseCase";

export class BuyTicketController {
    constructor(private buyTicketUseCase: BuyTicketUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { event, owner } = req.body;

        try {
            const ticket = await this.buyTicketUseCase.execute({ event, owner }).catch(error => {
                res.status(400).json({ error: error })
            })
            return res.status(201).json(ticket);
        } catch (error) {
            res.status(500).json({ error: error || "Unexpected error" });
        }
    }
}
