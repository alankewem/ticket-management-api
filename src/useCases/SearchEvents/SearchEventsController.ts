import { NextFunction, Request, Response } from "express";
import { SearchEventsUseCase } from "./SearchEventsUseCase";

export class SearchEventsController {
    constructor(private searchEventsUseCase: SearchEventsUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { title } = req.query;

        try {
            const events = await this.searchEventsUseCase.execute(title as string).catch(error => {
                res.status(400).json({ error: error })
            })
            return res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error || "Unexpected error" });
        }
    }
}
