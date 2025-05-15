import { Schema, model, models, Document } from "mongoose";

export interface IMeasurement extends Document {
  date: string;
  weight: number;
  height: number;
}

const MeasurementSchema = new Schema<IMeasurement>({
  date: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
});

export default models.Measurement ||
  model<IMeasurement>("Measurement", MeasurementSchema);
