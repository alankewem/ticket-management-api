import { hashSync } from "bcrypt";
import mongoose, { Types } from "mongoose";

export type IRoles = "admin" | "event-manager" | "common";

export class User {
  public readonly _id?: Types.ObjectId;
  public role?: IRoles;
  public name: string;
  public email: string;
  public password: string;
  public phone: string;

  constructor(props: Omit<User, "_id">, _id?: string) {
    Object.assign(this, props);

    if (!_id) {
      this._id = new mongoose.Types.ObjectId()
    }

    if (!this.role) {
      this.role = "common";
    }

    const hashedPass = hashSync(this.password, 10);
    this.password = hashedPass;
  }
}
