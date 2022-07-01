import { Ticket } from "../../entities/Ticket";
import { IEventRepository } from "../../repository/IEventRepository";
import { ITicketRepository } from "../../repository/ITicketRepository";
import { IBuyTicketDTO } from "./BuyTicketDTO";

export class BuyTicketUseCase {
    constructor(private ticketRepository: ITicketRepository, private eventRepository: IEventRepository) { }

    async execute(data: IBuyTicketDTO) {
        try {
            const event = await this.eventRepository.findById(data.event)
            const tickets = await this.ticketRepository.findByEvent(data.event)

            if (event.ticketsAvailable <= tickets.length) { 
                return Promise.reject("Tickets Sold Out")
            }

            const ticket = new Ticket(data)

            const createdTicket = await this.ticketRepository.save(ticket);
            const populatedTicket = await this.ticketRepository.findById(createdTicket._id)
            return Promise.resolve(populatedTicket);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
