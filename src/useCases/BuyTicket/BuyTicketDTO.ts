import { Types } from "mongoose"

export interface IBuyTicketDTO {
    owner: Types.ObjectId
    event: Types.ObjectId
}