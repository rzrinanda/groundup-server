import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAction } from '../action/interface/action.interface';
import { IAnomaly } from '../anomaly/interface/anomaly.interface';
import { IMachine } from '../machine/interface/machine.interface';
import { IReason } from '../reason/interface/reason.interface';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { IModAlert, IAlert } from './interface/alert.interface';

@Injectable()
export class AlertService {
  constructor(
    @InjectModel('Alert') private alertModel: Model<IAlert>,
    @InjectModel('Anomaly') private anomalyModel: Model<IAnomaly>,
    @InjectModel('Machine') private machineModel: Model<IMachine>,
    @InjectModel('Action') private actionModel: Model<IAction>,
    @InjectModel('Reason') private reasonModel: Model<IReason>,
  ) { }
  async create(createAlertDto: CreateAlertDto): Promise<IAlert> {
    const newAlert = await new this.alertModel(createAlertDto);
    return newAlert.save();
  }

  async findAll(): Promise<any[]> {
    const alertData = await this.alertModel.find().then(async (alert) => {
      const modAlert = await Promise.all(alert.map(async (r) => {
        const anomaly = await this.anomalyModel.findById(r.anomaly).exec();
        const action = await this.actionModel.findById(r.action).exec();
        const reason = await this.reasonModel.findById(r.reason).exec();
        const machine = await this.machineModel.findById(anomaly.machine).exec();
        return {
          _id: r._id,
          timestamp: anomaly.timestamp || undefined,
          anomaly: r.anomaly,
          anomalyName: anomaly.anomalyName || undefined,
          machineName: machine.machineName || undefined,
          action: r.action,
          actionName: action.actionName || undefined,
          reason: r.reason,
          reasonName: reason.reason || undefined,
        };
      }))
      return modAlert;
    })

    if (!alertData || alertData.length == 0) {
      throw new NotFoundException('Alert data not found!');
    }
    return alertData;
  }

  async findOne(id: number): Promise<IAlert> {
    const existingAlert = await (await this.alertModel.findById(id)).populated('Machine').exec();
    if (!existingAlert) {
      throw new NotFoundException(`Alert #${id} not found`);
    }
    return existingAlert;
  }

  async update(id: number, updateAlertDto: UpdateAlertDto): Promise<IAlert> {
    const existingAlert = await this.alertModel.findByIdAndUpdate(
      id,
      updateAlertDto,
      { new: true },
    );
    if (!existingAlert) {
      throw new NotFoundException(`Alert #${id} not found`);
    }
    return existingAlert;
  }

  async remove(id: number): Promise<IAlert> {
    const deletedAlert = await this.alertModel.findByIdAndDelete(id);
    if (!deletedAlert) {
      throw new NotFoundException(`Alert #${id} not found`);
    }
    return deletedAlert;
  }
}
