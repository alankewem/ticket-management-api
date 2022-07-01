import { Types } from "mongoose"

export interface IUpdateEventDTO {
    title: string
    description: string
    eventDate: string
    price: number
    ticketsAvailable: number
    address: string
    _id: Types.ObjectId
}