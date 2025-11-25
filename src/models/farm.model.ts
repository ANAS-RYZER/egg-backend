import { Schema, model, Document, Types } from 'mongoose';

export interface IRecord {
  _id?: Types.ObjectId;
  date: Date;
  shedNo: string;        // or shed id/name
  ageDays?: number;
  openingStock?: number;
  mortality?: number;
  closingStock?: number;
  foodQtyKg?: number;
  foodPerHenGrams?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IShed {
  name: string;
  isActive?: boolean;
}

export interface IFarm extends Document {
  name: string;
  location?: string;
  totalSheds: number;
  ownerName?: string;
  sheds: IShed[];
  records: IRecord[];
  createdAt: Date;
  updatedAt: Date;
}

const RecordSchema = new Schema<IRecord>({
  date: { type: Date, required: true },
  shedNo: { type: String, required: true },
  ageDays: { type: Number },
  openingStock: { type: Number },
  mortality: { type: Number },
  closingStock: { type: Number },
  foodQtyKg: { type: Number },
  foodPerHenGrams: { type: Number },
  notes: { type: String }
}, { timestamps: true });

const ShedSchema = new Schema<IShed>({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const FarmSchema = new Schema<IFarm>({
  name: { type: String, required: true },
  location: { type: String },
  totalSheds: { type: Number, required: true },
  ownerName: { type: String },
  sheds: { type: [ShedSchema], default: [] },
  records: { type: [RecordSchema], default: [] }
}, { timestamps: true });

export const Farm = model<IFarm>('Farm', FarmSchema);
