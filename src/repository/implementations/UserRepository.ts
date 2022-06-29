import { model, Schema } from "mongoose";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

const schema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "event-manager", "common"],
      required: true,
    },
    id: { type: String, required: true },
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
      const user = new User(data);
      await UserModel.create(user);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const userRepository = new UserRepository();
