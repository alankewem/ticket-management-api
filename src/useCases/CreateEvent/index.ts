import { eventRepository } from "../../repository/implementations/EventRepository";
import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";

const createEventUseCase = new CreateEventUseCase(eventRepository);

const createEventController = new CreateEventController(createEventUseCase);

export { createEventController, createEventUseCase };
