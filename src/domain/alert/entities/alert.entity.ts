import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Alert {
  @Prop()
  machineName: string;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
