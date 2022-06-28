import { model, Schema } from "mongoose";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private User() {
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

    return model<User>("User", schema);
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.User().findOne({ email: email });
    } catch (error) {
      Promise.reject(error);
    }
  }

  async save(user: User): Promise<void> {
    try {
      await this.User().create(user);
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const userRepository = new UserRepository();
