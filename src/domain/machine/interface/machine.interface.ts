import { Document } from 'mongoose';

export interface IMachine extends Document {
  readonly machineName: string;
  readonly isActive: boolean;
}
