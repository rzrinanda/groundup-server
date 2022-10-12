import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { MachineModule } from '../machine/machine.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Anomaly, AnomalySchema } from '../anomaly/entities/anomaly.entity';
import { Machine, MachineSchema } from '../machine/entities/machine.entity';
import { Alert, AlertSchema } from './entities/alert.entity';
import { AnomalyModule } from '../anomaly/anomaly.module';
import { ActionModule } from '../action/action.module';
import { ReasonModule } from '../reason/reason.module';
import { Action, ActionSchema } from '../action/entities/action.entity';
import { Reason, ReasonSchema } from '../reason/entities/reason.entity';

@Module({
  imports: [
    MachineModule,
    AnomalyModule,
    ActionModule,
    ReasonModule,
    // MongooseModule.forRoot('mongodb://localhost/groundup_db'),
    MongooseModule.forFeature([
      { name: Alert.name, schema: AlertSchema },
      { name: Anomaly.name, schema: AnomalySchema },
      { name: Machine.name, schema: MachineSchema },
      { name: Action.name, schema: ActionSchema },
      { name: Reason.name, schema: ReasonSchema },
    ]),
  ],
  controllers: [AlertController],
  providers: [AlertService]
})
export class AlertModule { }
