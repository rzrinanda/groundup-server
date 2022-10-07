import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Susreason {
    @Prop()
    reason: string
}

export const SusreasonSchema = SchemaFactory.createForClass(Susreason);
