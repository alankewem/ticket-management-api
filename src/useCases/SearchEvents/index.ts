import { eventRepository } from "../../repository/implementations/EventRepository";
import { SearchEventsUseCase } from "./SearchEventsUseCase";
import { SearchEventsController } from "./SearchEventsController";

const searchEventsUseCase = new SearchEventsUseCase(eventRepository)
const searchEventsController = new SearchEventsController(searchEventsUseCase)

export { searchEventsController, searchEventsUseCase }