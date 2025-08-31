import mongoose, { Schema, Document, models } from "mongoose";

export interface IScan extends Document {
  userId: mongoose.Types.ObjectId; // linked to User
  url: string;
  headers: Record<string, unknown>;
  issues: {
    missingHeaders: string[];
    corsOpen: boolean;
    xssDetected: boolean;
    sqliDetected: boolean;
  };
  explanation: string;
  createdAt: Date;
}

const ScanSchema = new Schema<IScan>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  headers: { type: Object, required: true },
  issues: {
    missingHeaders: [String],
    corsOpen: Boolean,
    xssDetected: Boolean,
    sqliDetected: Boolean,
  },
  explanation: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.Scan || mongoose.model<IScan>("Scan", ScanSchema);
