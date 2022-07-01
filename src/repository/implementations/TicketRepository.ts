import { model, Schema, Types } from "mongoose";
import { Ticket } from "../../entities/Ticket";
import { ITicketRepository } from "../ITicketRepository";

const schema = new Schema<Ticket>({
  _id: { type: Schema.Types.ObjectId, required: true },
  event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const TicketModel = model<Ticket>("Ticket", schema);

class TicketRepository implements ITicketRepository {
  async findById(id: Types.ObjectId): Promise<Ticket> {
    try {
      return await TicketModel.findById(id).populate("event").populate("owner")
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findByEvent(eventId: string): Promise<Ticket[]> {
    try {
      return await TicketModel.find({ event: eventId })
    } catch (error) {
      Promise.reject(error);
    }
  }

  async save(data: Ticket) {
    try {
      return await TicketModel.create(data);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const ticketRepository = new TicketRepository();
