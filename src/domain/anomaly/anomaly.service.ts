import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMachine } from '../machine/interface/machine.interface';
import { CreateAnomalyDto } from './dto/create-anomaly.dto';
import { UpdateAnomalyDto } from './dto/update-anomaly.dto';
import { IAnomaly } from './interface/anomaly.interface';
import { RandomId } from '../../utils/common'

@Injectable()
export class AnomalyService {
  constructor(
    @InjectModel('Anomaly') private anomalyModel: Model<IAnomaly>,
    @InjectModel('Machine') private machineModel: Model<IMachine>,
  ) { }
  async create(createAnomalyDto: CreateAnomalyDto): Promise<IAnomaly> {
    const machine: IMachine = await (this.machineModel.findOne({ machineName: createAnomalyDto.machine }).exec())
    if (!machine) {
      throw new NotFoundException(`Machine '${createAnomalyDto.machine}' not found`);
    }
    createAnomalyDto = { ...createAnomalyDto, timestamp: (+new Date()).toString(), sensor: RandomId(8), machine: machine._id }
    console.log(createAnomalyDto)

    const newAnomaly = await new this.anomalyModel(createAnomalyDto);
    return newAnomaly.save();
  }

  async findAll(): Promise<any[]> {
    const anomalyData = await this.anomalyModel.find().then(async (anomaly) => {
      const modAnomaly = await Promise.all(anomaly.map(async (r) => {
        const machine = await this.machineModel.findById(r.machine).exec();
        return {
          timestamp: r.timestamp,
          machine: r.machine,
          anomaly: r.anomalyName,
          machineName: machine.machineName,
          sensor: r.sensor,
          soundClip: r.soundClip
        };
      }))
      return modAnomaly;
    })

    if (!anomalyData || anomalyData.length == 0) {
      throw new NotFoundException('Anomaly data not found!');
    }
    return anomalyData;
  }

  async findOne(id: number): Promise<IAnomaly> {
    const existingAnomaly = await (await this.anomalyModel.findById(id)).populated('Machine').exec();
    if (!existingAnomaly) {
      throw new NotFoundException(`Anomaly #${id} not found`);
    }
    return existingAnomaly;
  }

  async update(id: number, updateAnomalyDto: UpdateAnomalyDto): Promise<IAnomaly> {
    const existingAnomaly = await this.anomalyModel.findByIdAndUpdate(
      id,
      updateAnomalyDto,
      { new: true },
    );
    if (!existingAnomaly) {
      throw new NotFoundException(`Anomaly #${id} not found`);
    }
    return existingAnomaly;
  }

  async remove(id: number): Promise<IAnomaly> {
    const deletedAnomaly = await this.anomalyModel.findByIdAndDelete(id);
    if (!deletedAnomaly) {
      throw new NotFoundException(`Anomaly #${id} not found`);
    }
    return deletedAnomaly;
  }
}
