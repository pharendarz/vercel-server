import { Model } from "mongoose";
export class DatabaseDefault<T extends object> {
  constructor(protected databaseModel?: Model<any>) {}
  public create = async (data: T) => {
    return new Promise((resolve, reject) => {
      if (!("userId" in data)) {
        throw new Error("User Id not provided in record!");
      }
      console.log("[create] data:", data);
      console.log("[create] model:", this.databaseModel);
      this.databaseModel.create(
        {
          ...data,
        },
        (err, payload) => {
          if (err) {
            reject(err);
          }
          resolve(payload);
        }
      );
    });
  };
}
