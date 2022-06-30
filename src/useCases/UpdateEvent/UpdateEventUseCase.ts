import { Event } from "../../entities/Event";
import { IEventRepository } from "../../repository/IEventRepository";

export class UpdateEventUseCase {
    constructor(private eventRepository: IEventRepository) { }

    async execute(data: IUpdateEventDTO) {
        try {
            const eventAlreadyExists = await this.eventRepository.findByTitle(data.title)

            if (eventAlreadyExists) {
                return Promise.reject("Event title already exists");
            }

            const updatedEvent = await this.eventRepository.findByIdAndUpdate(data);
            return Promise.resolve(updatedEvent);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
