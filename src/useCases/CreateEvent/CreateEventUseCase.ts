import { Event } from "../../entities/Event";
import { IEventRepository } from "../../repository/IEventRepository";
import { CreateEventDTO } from "./CreateEventDTO";

export class CreateEventUseCase {
    constructor(private eventRepository: IEventRepository) { }

    async execute(data: CreateEventDTO) {
        try {
            const eventAlreadyExists = await this.eventRepository.findByTitle(data.title)

            if (eventAlreadyExists) {
                return Promise.reject("Event title already exists");
            }

            const event = new Event(data);

            const createdEvent = await this.eventRepository.save(event);
            return Promise.resolve(createdEvent);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
