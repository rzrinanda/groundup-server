import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { IAction } from './interface/action.interface';

@Injectable()
export class ActionService {
  constructor(@InjectModel('Action') private actionModel: Model<IAction>) { }
  async create(createActionDto: CreateActionDto): Promise<IAction> {
    const newAction = await new this.actionModel(createActionDto);
    return newAction.save();
  }

  async findAll(): Promise<IAction[]> {
    const actionData = await this.actionModel.find();
    if (!actionData || actionData.length == 0) {
      throw new NotFoundException('Action data not found!');
    }
    return actionData;
  }

  async findOne(id: number): Promise<IAction> {
    const existingAction = await this.actionModel.findById(id).exec();
    if (!existingAction) {
      throw new NotFoundException(`Action #${id} not found`);
    }
    return existingAction;
  }

  async update(id: number, updateActionDto: UpdateActionDto): Promise<IAction> {
    const existingAction = await this.actionModel.findByIdAndUpdate(
      id,
      updateActionDto,
      { new: true },
    );
    if (!existingAction) {
      throw new NotFoundException(`Action #${id} not found`);
    }
    return existingAction;
  }

  async remove(id: number): Promise<IAction> {
    const deletedAction = await this.actionModel.findByIdAndDelete(id);
    if (!deletedAction) {
      throw new NotFoundException(`Action #${id} not found`);
    }
    return deletedAction;
  }

  async initialization(): Promise<IAction[]> {
    const actions = ['Immediate', 'Later', 'No Action'];
    let process = 0;
    for (let a = 0; a < actions.length; a++) {
      const actionDto = { actionName: actions[a] };
      const isExist = await this.actionModel.findOne({
        actionName: actions[a],
      });

      if (!isExist) {
        const newAction = await new this.actionModel(actionDto);
        newAction.save();
      }
      process++;
    }

    if (process == actions.length) {
      const actionData = await this.actionModel.find();
      if (!actionData || actionData.length == 0) {
        throw new NotFoundException('Action data not found!');
      }
      return actionData;
    } else {
      throw new BadRequestException('Initialization process is not finished');
    }
  }
}
