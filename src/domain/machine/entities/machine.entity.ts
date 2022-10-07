import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Machine {
  @Prop()
  machineName: string;

  @Prop()
  isActive: boolean;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
