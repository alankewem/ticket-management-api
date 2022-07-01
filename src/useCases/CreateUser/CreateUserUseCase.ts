import { User } from "../../entities/User";
import { IUserRepository } from "../../repository/IUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: ICreateUserDTO) {
    try {
      const userAlreadyExists = await this.userRepository.findByEmail(data.email);

      if (userAlreadyExists) {
        return Promise.reject("User already exist");
      }

      if (data.role && data.role !== "common") {
        return Promise.reject("Unauthorized")
      }

      const user = new User(data);

      await this.userRepository.save(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
