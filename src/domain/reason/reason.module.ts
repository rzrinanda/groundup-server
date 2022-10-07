import { Module } from '@nestjs/common';
import { ReasonService } from './reason.service';
import { ReasonController } from './reason.controller';
import { Reason, ReasonSchema } from './entities/reason.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MachineModule } from '../machine/machine.module';
import { Machine, MachineSchema } from '../machine/entities/machine.entity';

@Module({
  imports: [
    MachineModule,
    MongooseModule.forRoot('mongodb://localhost/groundup_db'),
    MongooseModule.forFeature([
      { name: Reason.name, schema: ReasonSchema },
      { name: Machine.name, schema: MachineSchema },
    ]),
  ],
  controllers: [ReasonController],
  providers: [ReasonService],
})
export class ReasonModule {}
