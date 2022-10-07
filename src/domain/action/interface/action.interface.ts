import { Document } from 'mongoose';

export interface IAction extends Document {
  readonly actionName: string;
}
