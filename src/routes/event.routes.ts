import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { createEventController } from "../useCases/CreateEvent";

const router = Router();

router.post(
    "/",
    checkSchema({
        title: { isString: true },
        description: { isString: true },
        eventDate: { isString: true },
        price: { isNumeric: true },
        ticketsAvailable: { isNumeric: true },
        address: { isString: true }
    }),
    async (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return await createEventController.handle(request, response, next);
    }
);

export default router;
