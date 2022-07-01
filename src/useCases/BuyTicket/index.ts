import { ticketRepository } from "../../repository/implementations/TicketRepository";
import { eventRepository } from "../../repository/implementations/EventRepository";
import { BuyTicketUseCase } from "./BuyTicketUseCase";
import { BuyTicketController } from "./BuyTicketController";

const buyTicketUseCase = new BuyTicketUseCase(ticketRepository, eventRepository)
const buyTicketController = new BuyTicketController(buyTicketUseCase)

export { buyTicketController, buyTicketUseCase }