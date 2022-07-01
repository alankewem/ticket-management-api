import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, param, query, validationResult } from "express-validator";
import { authJWT } from "../middleware/auth";
import { createEventController } from "../useCases/CreateEvent";
import { excludeEventController } from "../useCases/ExcludeEvent";
import { searchEventsController } from "../useCases/SearchEvents";
import { updateEventController } from "../useCases/UpdateEvent";

const router = Router();

router.post(
    "/",
    authJWT(["admin", "event-manager"]),
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

router.put(
    "/",
    authJWT(["admin", "event-manager"]),
    checkSchema({
        _id: { isString: true },
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

        return await updateEventController.handle(request, response, next);
    }
);

router.get("/", query("title").isString().notEmpty(),
    async (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return await searchEventsController.handle(request, response, next);
    }
)

router.delete("/:eventId",
    authJWT(["admin", "event-manager"]),
    param("eventId").isString().notEmpty(),
    async (request: Request, response: Response, next: NextFunction) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return await excludeEventController.handle(request, response, next);
    })
export default router;
