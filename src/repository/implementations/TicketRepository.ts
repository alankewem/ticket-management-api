import { model, Schema } from "mongoose";
import { Ticket } from "../../entities/Ticket";
import { ITicketRepository } from "../ITicketRepository";

const schema = new Schema<Ticket>({
  id: { type: String, required: true },
  event: { type: String, ref: "Event", required: true },
  owner: { type: String, ref: "User", required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

const TicketModel = model<Ticket>("Ticket", schema);

class TicketRepository implements ITicketRepository {
  async findById(id: string): Promise<Ticket> {
    try {
      return await TicketModel.findOne({ id: id });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findByEvent(eventId: string): Promise<Ticket[]> {
    try {
      return await TicketModel.find({ event: eventId });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async save(data: Ticket): Promise<void> {
    try {
      const ticket = new Ticket(data);
      await TicketModel.create(ticket);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const ticketRepository = new TicketRepository();
