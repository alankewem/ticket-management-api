import { Event } from "../entities/Event";

export interface IEventRepository {
  findById(id: string): Promise<Event>;
  findByTitle(text: string): Promise<Event>
  findSimilarTitles(text: string): Promise<Event[]>
  save(event: Event): Promise<void>;
}
