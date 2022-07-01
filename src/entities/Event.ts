import { randomUUID } from "crypto";
import mongoose, { Types } from "mongoose";

export class Event {
  public readonly _id?: Types.ObjectId;
  public title: string;
  public description: string;
  public eventDate: string;
  public price: number;
  public ticketsAvailable: number;
  public address: string;

  constructor(
    props: Omit<Event, "_id">, _id?: string
  ) {
    Object.assign(this, props);

    if (!_id) {
      this._id = new mongoose.Types.ObjectId()
    }
  }
}
