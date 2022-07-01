import { randomUUID } from "crypto";
import mongoose, { Types } from "mongoose";

export class Ticket {
  public readonly _id?: Types.ObjectId;
  public readonly owner: Types.ObjectId;
  public readonly event: Types.ObjectId;

  constructor(
    props: Omit<Ticket, "_id">, _id?: string) {
    Object.assign(this, props);

    if (!_id) {
      this._id = new mongoose.Types.ObjectId()
    }
  }
}
