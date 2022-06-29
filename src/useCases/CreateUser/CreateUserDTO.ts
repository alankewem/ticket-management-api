import { IRoles } from "../../entities/User";

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: IRoles;
}
