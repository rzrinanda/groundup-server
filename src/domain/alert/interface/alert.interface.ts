import { Document } from 'mongoose';

export interface IAlert extends Document {
  readonly anomaly: string;
  readonly reason: string;
  readonly action: string;
  readonly comments: string;
}

export interface IModAlert {
  readonly anomaly: string;
  readonly anomalyName: string;
  readonly machineName: string;
  readonly reason: string;
  readonly reasonName: string;
  readonly action: string;
  readonly actionName: string;
  readonly comments: string;
}
