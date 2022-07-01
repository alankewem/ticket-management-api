import { Types } from "mongoose";
import { Ticket } from "../entities/Ticket";

export interface ITicketRepository {
  findById(id: Types.ObjectId): Promise<Ticket>;
  findByEvent(eventId: string): Promise<Ticket[]>;
  save(ticket: Ticket): Promise<Ticket>;
}
