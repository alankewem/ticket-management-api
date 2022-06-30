import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoDB } from "./infra/database";
import UserRoutes from "./routes/user.routes";
import EventRoutes from "./routes/event.routes";

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
    this.database();
  }
  private async database() {
    console.log("connecting...");
    const mongodb = new MongoDB();
    await mongodb.connection();
  }

  private middleware() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
  }

  private router() {
    this.server.use("/user", UserRoutes);
    this.server.use("/event", EventRoutes);
    this.server.use((req, res, next) => {
      res.status(404);
      res.send({
        error: "not found",
      });
    });
  }
}

export default new App().server;
