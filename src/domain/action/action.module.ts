import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { Action, ActionSchema } from './entities/action.entity'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/groundup_db'),
  MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }])],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule { }
