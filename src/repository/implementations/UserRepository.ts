import { model, Schema } from "mongoose";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

const schema = new Schema<User>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "event-manager", "common"],
      required: true,
    },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = model<User>("User", schema);

class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    try {
      return await UserModel.findOne({ email: email });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async save(data: User): Promise<void> {
    try {
      await UserModel.create(data);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const userRepository = new UserRepository();
