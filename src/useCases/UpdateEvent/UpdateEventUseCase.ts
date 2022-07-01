import { IEventRepository } from "../../repository/IEventRepository";
import { IUpdateEventDTO } from "./UpdateEventDTO";

export class UpdateEventUseCase {
    constructor(private eventRepository: IEventRepository) { }

    async execute(data: IUpdateEventDTO) {
        try {
            const eventAlreadyExists = await this.eventRepository.findByTitle(data.title)

            if (eventAlreadyExists && eventAlreadyExists._id.toString() != data._id.toString()) {
                return Promise.reject("Event title already exists");
            }

            const updatedEvent = await this.eventRepository.findByIdAndUpdate(data);
            return Promise.resolve(updatedEvent);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
