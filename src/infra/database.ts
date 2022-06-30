import mongoose from "mongoose";

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;

export class MongoDB {
  public async connection() {
    console.log(this.URL())
    return mongoose
      .connect(this.URL(), this.options)
      .then(() => {
        console.log("MongoDB is connected");
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  private options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
  };

  private URL() {
    return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  }
}
