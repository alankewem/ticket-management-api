import { model, Schema } from "mongoose";
import { Event } from "../../entities/Event";
import { IEventRepository } from "../IEventRepository";

class EventRepository implements IEventRepository {
  private Event() {
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

    return model<Event>("Event", schema);
  }

  async findById(id: string): Promise<Event> {
    try {
      return await this.Event().findOne({ id: id });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findByTitle(text: string): Promise<Event[]> {
    try {
      return await this.Event().find({
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
  async save(data: Event): Promise<void> {
    try {
      const event = new Event(data);
      await this.Event().create(event);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const eventRepository = new EventRepository();
