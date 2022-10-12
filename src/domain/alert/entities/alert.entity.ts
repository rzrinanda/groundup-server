import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Action } from 'src/domain/action/entities/action.entity';
import { Anomaly } from 'src/domain/anomaly/entities/anomaly.entity';
import { Reason } from 'src/domain/reason/entities/reason.entity';

@Schema()
export class Alert {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Anomaly' })
  anomaly: Anomaly;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reason' })
  reason: Reason;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Action' })
  action: Action;

  @Prop()
  comments: string;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
