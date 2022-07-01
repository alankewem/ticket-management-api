import { ticketRepository } from "../../repository/implementations/TicketRepository";
import { BuyTicketUseCase } from "./BuyTicketUseCase";
import { BuyTicketController } from "./BuyTicketController";

const buyTicketUseCase = new BuyTicketUseCase(ticketRepository)
const buyTicketController = new BuyTicketController(buyTicketUseCase)

export { buyTicketController, buyTicketUseCase }