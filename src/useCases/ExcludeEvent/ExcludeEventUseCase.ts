import { IEventRepository } from "../../repository/IEventRepository";

export class ExcludeEventUseCase {
    constructor(private eventRepository: IEventRepository) { }

    async execute(eventId: string) {
        try {
            await this.eventRepository.excludeById(eventId)
            return Promise.resolve(`Event: ${eventId} excluded`);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
