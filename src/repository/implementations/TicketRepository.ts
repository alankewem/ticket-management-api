import { model, Schema } from "mongoose";
import { Ticket } from "../../entities/Ticket";
import { ITicketRepository } from "../ITicketRepository";

class TicketRepository implements ITicketRepository {
  private Ticket() {
    const schema = new Schema<Ticket>({
      id: { type: String, required: true },
      event: { type: String, ref: "Event", required: true },
      owner: { type: String, ref: "User", required: true },
      createdAt: { type: String, required: true },
      updatedAt: { type: String, required: true },
    });

    return model<Ticket>("Ticket", schema);
  }

  async findById(id: string): Promise<Ticket> {
    try {
      return await this.Ticket().findOne({ id: id });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findByEvent(eventId: string): Promise<Ticket[]> {
    try {
      return await this.Ticket().find({ event: eventId });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async save(data: Ticket): Promise<void> {
    try {
      const ticket = new Ticket(data);
      await this.Ticket().create(ticket);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const ticketRepository = new TicketRepository();
