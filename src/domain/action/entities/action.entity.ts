import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Action {
  @Prop()
  actionName: string;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
