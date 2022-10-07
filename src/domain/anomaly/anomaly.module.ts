import { Module } from '@nestjs/common';
import { AnomalyService } from './anomaly.service';
import { AnomalyController } from './anomaly.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MachineModule } from '../machine/machine.module';
import { Anomaly, AnomalySchema } from './entities/anomaly.entity';
import { Machine, MachineSchema } from '../machine/entities/machine.entity';

@Module({
  imports: [
    MachineModule,
    MongooseModule.forRoot('mongodb://localhost/groundup_db'),
    MongooseModule.forFeature([
      { name: Anomaly.name, schema: AnomalySchema },
      { name: Machine.name, schema: MachineSchema },
    ]),
  ],
  controllers: [AnomalyController],
  providers: [AnomalyService],
})
export class AnomalyModule {}
