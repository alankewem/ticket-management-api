import { NextFunction, Request, Response } from "express";
import { ExcludeEventUseCase } from "./ExcludeEventUseCase";

export class ExcludeEventController {
    constructor(private excludeEventUseCase: ExcludeEventUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { eventId } = req.params;

        try {
            const result = await this.excludeEventUseCase.execute(eventId).catch(error => {
                res.status(400).json({ error: error })
            })
            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error || "Unexpected error" });
        }
    }
}
