import { Document } from 'mongoose';

export interface IReason extends Document {
  readonly machine: string;
  readonly reason: string;
}

export interface IModReason {
  readonly machine: string;
  readonly reason: string;
  readonly machineName: string;
}
