import { LoginUserUseCase } from "./LoginUserUseCase";
import { userRepository } from "../../repository/implementations/UserRepository";
import { LoginUserController } from "./LoginUserController";

const loginUserUseCase = new LoginUserUseCase(userRepository)
const loginUserController = new LoginUserController(loginUserUseCase)

export { loginUserController, loginUserUseCase }
