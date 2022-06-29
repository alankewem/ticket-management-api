import { Ticket } from "../entities/Ticket";

export interface ITicketRepository {
  findById(id: string): Promise<Ticket>;
  findByEvent(eventId: string): Promise<Ticket[]>;
  save(ticket: Ticket): Promise<void>;
}
