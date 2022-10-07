import { Document } from 'mongoose';

export interface ISusreason extends Document {
  readonly reason: string;
}
