import { Module } from '@nestjs/common';
import { SusreasonService } from './susreason.service';
import { SusreasonController } from './susreason.controller';
import { Susreason, SusreasonSchema } from './entities/susreason.entity'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/groundup_db'),
  MongooseModule.forFeature([{ name: Susreason.name, schema: SusreasonSchema }])],
  controllers: [SusreasonController],
  providers: [SusreasonService],
})
export class SusreasonModule { }
