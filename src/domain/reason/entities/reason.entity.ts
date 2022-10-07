import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Susreason } from '../../susreason/entities/susreason.entity';
import { Machine } from 'src/domain/machine/entities/machine.entity';

@Schema()
export class Reason {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' })
  machine: Machine;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SusReason' })
  @Prop()
  reason: string;
}

export const ReasonSchema = SchemaFactory.createForClass(Reason);
