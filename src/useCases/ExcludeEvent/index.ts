import { eventRepository } from "../../repository/implementations/EventRepository";
import { ExcludeEventUseCase } from "./ExcludeEventUseCase";
import { ExcludeEventController } from "./ExcludeEventController";

const excludeEventUseCase = new ExcludeEventUseCase(eventRepository)
const excludeEventController = new ExcludeEventController(excludeEventUseCase)

export { excludeEventController, excludeEventUseCase }