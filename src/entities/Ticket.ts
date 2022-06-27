import { randomUUID } from "crypto";

export class Ticket {
  public readonly id: string;
  public readonly owner: string;
  public readonly event: string;
  public readonly createdAt: string;
  public updatedAt: string;

  constructor(
    props: Omit<Ticket, "id" | "createdAt" | "updatedAt">,
    id?: string,
    createdAt?: string
  ) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }

    if (!createdAt) {
      this.createdAt = new Date().toUTCString();
      this.updatedAt = new Date().toUTCString();
    }

    if (createdAt) {
      this.updatedAt = new Date().toUTCString();
    }
  }
}
