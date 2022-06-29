import { User } from "../../entities/User";
import { IUserRepository } from "../../repository/IUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO) {
    try {
      const userAlreadyExists = await this.userRepository.findByEmail(data.email);

      if (userAlreadyExists) {
        throw new Error("user already exists");
      }

      const user = new User(data);

      await this.userRepository.save(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
