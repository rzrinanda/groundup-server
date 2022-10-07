import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSusreasonDto } from './dto/create-susreason.dto';
import { UpdateSusreasonDto } from './dto/update-susreason.dto';
import { ISusreason } from './interface/susreason.interface';

@Injectable()
export class SusreasonService {
  constructor(
    @InjectModel('Susreason') private susreasonModel: Model<ISusreason>,
  ) {}
  async create(createSusreasonDto: CreateSusreasonDto): Promise<ISusreason> {
    const newSusreason = await new this.susreasonModel(createSusreasonDto);
    return newSusreason.save();
  }

  async findAll(): Promise<ISusreason[]> {
    const susreasonData = await this.susreasonModel.find();
    if (!susreasonData || susreasonData.length == 0) {
      throw new NotFoundException('Suspected Reason data not found!');
    }
    return susreasonData;
  }

  async findOne(id: number): Promise<ISusreason> {
    const existingSusreason = await this.susreasonModel.findById(id).exec();
    if (!existingSusreason) {
      throw new NotFoundException(`Suspected Reason #${id} not found`);
    }
    return existingSusreason;
  }

  async update(
    id: number,
    updateSusreasonDto: UpdateSusreasonDto,
  ): Promise<ISusreason> {
    const existingSusreason = await this.susreasonModel.findByIdAndUpdate(
      id,
      updateSusreasonDto,
      { new: true },
    );
    if (!existingSusreason) {
      throw new NotFoundException(`Suspected Reason #${id} not found`);
    }
    return existingSusreason;
  }

  async remove(id: number): Promise<ISusreason> {
    const deletedSusreason = await this.susreasonModel.findByIdAndDelete(id);
    if (!deletedSusreason) {
      throw new NotFoundException(`Suspected Reason #${id} not found`);
    }
    return deletedSusreason;
  }

  async initialization(): Promise<ISusreason[]> {
    const susreasons = [
      'Spindle Error',
      'Axis Problem',
      'Normal',
      'Machine Crash',
      'Router Fault',
    ];
    let process = 0;
    for (let a = 0; a < susreasons.length; a++) {
      const susreasonDto = { reason: susreasons[a] };
      const isExist = await this.susreasonModel.findOne({
        reason: susreasons[a],
      });

      if (!isExist) {
        const newSusreason = await new this.susreasonModel(susreasonDto);
        newSusreason.save();
      }
      process++;
    }

    if (process == susreasons.length - 1) {
      const susreasonData = await this.susreasonModel.find();
      if (!susreasonData || susreasonData.length == 0) {
        throw new NotFoundException('Suspected Reason data not found!');
      }
      return susreasonData;
    } else {
      throw new BadRequestException('Initialization process is not finished');
    }
  }
}
