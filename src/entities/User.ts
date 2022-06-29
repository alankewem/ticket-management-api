import { randomUUID } from "crypto";
import { hashSync } from "bcrypt";

export type IRoles = "admin" | "event-manager" | "common";

export class User {
  public readonly id: string;
  public role?: IRoles;
  public name: string;
  public email: string;
  public password: string;
  public phone: string;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }

    if (!this.role) {
      this.role = "common";
    }

    const hashedPass = hashSync(this.password, 10);
    this.password = hashedPass;
  }
}
