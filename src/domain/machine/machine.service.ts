import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { IMachine } from './interface/machine.interface';

@Injectable()
export class MachineService {
  constructor(@InjectModel('Machine') private machineModel: Model<IMachine>) { }
  async create(createMachineDto: CreateMachineDto): Promise<IMachine> {
    const newMachine = await new this.machineModel(createMachineDto);
    return newMachine.save();
  }

  async findAll(): Promise<IMachine[]> {
    const machineData = await this.machineModel.find();
    if (!machineData || machineData.length == 0) {
      throw new NotFoundException('Machine data not found!');
    }
    return machineData;
  }

  async findOne(id: number): Promise<IMachine> {
    const existingMachine = await this.machineModel.findById(id).exec();
    if (!existingMachine) {
      throw new NotFoundException(`Machine #${id} not found`);
    }
    return existingMachine;
  }

  async update(
    id: number,
    updateMachineDto: UpdateMachineDto,
  ): Promise<IMachine> {
    const existingMachine = await this.machineModel.findByIdAndUpdate(
      id,
      updateMachineDto,
      { new: true },
    );
    if (!existingMachine) {
      throw new NotFoundException(`Machine #${id} not found`);
    }
    return existingMachine;
  }

  async remove(id: number): Promise<IMachine> {
    const deletedMachine = await this.machineModel.findByIdAndDelete(id);
    if (!deletedMachine) {
      throw new NotFoundException(`Machine #${id} not found`);
    }
    return deletedMachine;
  }

  async initialization(): Promise<IMachine[]> {
    const machines = [
      { machineName: 'CNC Machine', isActive: true },
      { machineName: 'Milling Machine', isActive: true },
    ];
    // console.log(machines)
    let process = 0;
    for (let a = 0; a < machines.length; a++) {
      const machineDto = machines[a];
      const isExist = await this.machineModel.findOne({
        machineName: machines[a].machineName,
      });
      // console.log(isExist, machines[a]);
      if (!isExist) {
        const newMachine = await new this.machineModel(machineDto);
        newMachine.save();
      }
      process++;
    }
    // console.log(process, machines.length)
    if (process == machines.length) {
      const machineData = await this.machineModel.find();
      if (!machineData || machineData.length == 0) {
        throw new NotFoundException('Machine data not found!');
      }
      return machineData;
    } else {
      throw new BadRequestException('Initialization process is not finished');
    }
  }
}
