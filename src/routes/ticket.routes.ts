import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { buyTicketController } from "../useCases/BuyTicket";

const router = Router();

router.post(
    "/",
    checkSchema({ event: { isString: true }, owner: { isString: true } }),
    async (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return await buyTicketController.handle(request, response, next);
    }
);

export default router;
