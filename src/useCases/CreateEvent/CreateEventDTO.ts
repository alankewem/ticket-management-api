import { IAddress } from "../../entities/Event"

export interface CreateEventDTO {
    title: string
    description: string
    eventDate: string
    price: number
    ticketsAvailable: number
    address: IAddress
}