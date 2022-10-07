import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date } from 'mongoose';
import { Machine } from 'src/domain/machine/entities/machine.entity';

@Schema()
export class Anomaly {
  @Prop()
  timestamp: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' })
  machine: Machine;

  @Prop()
  anomalyName: string;

  @Prop()
  sensor: string

  @Prop()
  soundClip: string


}

export const AnomalySchema = SchemaFactory.createForClass(Anomaly);
