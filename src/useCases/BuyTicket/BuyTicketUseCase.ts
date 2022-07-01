import { Ticket } from "../../entities/Ticket";
import { ITicketRepository } from "../../repository/ITicketRepository";
import { IBuyTicketDTO } from "./BuyTicketDTO";

export class BuyTicketUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute(data: IBuyTicketDTO) {
        try {
            const ticket = new Ticket(data)

            await this.ticketRepository.save(ticket);
            const populatedTicket = await this.ticketRepository.findById(ticket.id)
            return Promise.resolve(populatedTicket);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
