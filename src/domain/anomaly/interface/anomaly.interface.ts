import { Document } from 'mongoose';

export interface IAnomaly extends Document {
  readonly timestamp: Date;
  readonly machine: string;
  readonly anomalyName: string;
  readonly sensor: string
  readonly soundClip: string
}
