import { eventRepository } from "../../repository/implementations/EventRepository";
import { UpdateEventUseCase } from "./UpdateEventUseCase";
import { UpdateEventController } from "./UpdateEventController";

const updateEventUseCase = new UpdateEventUseCase(eventRepository)
const updateEventController = new UpdateEventController(updateEventUseCase)


export { updateEventController, updateEventUseCase }