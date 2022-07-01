import { Event } from "../entities/Event";

export interface IEventRepository {
  findByTitle(text: string): Promise<Event>
  findSimilarTitles(text: string): Promise<Event[]>
  save(event: Event): Promise<Event>;
  findByIdAndUpdate(event: Event): Promise<Event>
  excludeById(eventId: string): Promise<void>
}
