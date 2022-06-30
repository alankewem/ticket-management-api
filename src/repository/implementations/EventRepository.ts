import { model, Schema } from "mongoose";
import { Event } from "../../entities/Event";
import { IEventRepository } from "../IEventRepository";

const schema = new Schema<Event>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  eventDate: { type: String, required: true },
  price: { type: Number, required: true },
  ticketsAvailable: { type: Number, required: true },
  address: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

schema.index({ title: "text" });

const EventModel = model<Event>("Event", schema);

class EventRepository implements IEventRepository {
  async findByIdAndUpdate(event: Event): Promise<Event> {
    const updatedEvent = await EventModel.findOneAndUpdate({ id: event.id }, { $set: { ...event, updatedAt: new Date().toUTCString() } }, { new: true })
    return updatedEvent
  }

  async findSimilarTitles(text: string): Promise<Event[]> {
    try {
      return await EventModel.find({
        $text: {
          $search: text,
          $caseSensitive: false,
          $diacriticSensitive: false,
          $language: "pt",
        },
      });
    } catch (error) {
      Promise.reject(error);
    }

  }

  async findById(id: string): Promise<Event> {
    try {
      return await EventModel.findOne({ id: id });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findByTitle(title: string): Promise<Event> {
    try {
      return await EventModel.findOne({ title: title });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async save(data: Event): Promise<void> {
    try {
      const event = new Event(data);
      await EventModel.create(event);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const eventRepository = new EventRepository();
