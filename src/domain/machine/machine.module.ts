import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { Machine, MachineSchema } from './entities/machine.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/groundup_db'),
    MongooseModule.forFeature([{ name: Machine.name, schema: MachineSchema }]),
  ],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
