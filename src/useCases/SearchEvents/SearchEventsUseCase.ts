import { Event } from "../../entities/Event";
import { IEventRepository } from "../../repository/IEventRepository";

export class SearchEventsUseCase {
    constructor(private eventRepository: IEventRepository) { }

    async execute(title: string) {
        try {
            const events = await this.eventRepository.findSimilarTitles(title)

            return Promise.resolve(events);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
