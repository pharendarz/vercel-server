import { Schema, Model, Document, model } from "mongoose";

// # scheduler template schema
const DataSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
});

export const DataDefaultModel: Model<Document> = model("Data", DataSchema);
