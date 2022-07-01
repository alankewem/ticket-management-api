import { IUserRepository } from "../../repository/IUserRepository";
import { ILoginUserDTO } from "./LoginUserDTO";
import { compareSync, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class LoginUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: ILoginUserDTO) {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            return Promise.reject("user doesn't exists")
        }

        const correctPassword = await compare(data.password, user.password)

        if (!correctPassword) {
            return Promise.reject("uncorrect password")
        }

        const jwt = sign({ user: user.role }, process.env.JWT_SECRET, { expiresIn: "6 hours" })

        return jwt
    }
}
