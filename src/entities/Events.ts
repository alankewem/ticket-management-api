import { randomUUID } from "crypto";

export class Event {
  public readonly id: string;
  public title: string;
  public description: string;
  public eventDate: string;
  public price: string;
  public readonly createdAt: string;
  public updatedAt: string;

  constructor(
    props: Omit<Event, "id" | "createdAt" | "updatedAt">,
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
