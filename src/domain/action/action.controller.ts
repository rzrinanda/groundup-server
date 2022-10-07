import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  async create(@Res() response, @Body() createActionDto: CreateActionDto) {
    try {
      const newAction = await this.actionService.create(createActionDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Action has been created successfully',
        newAction,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Action not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const actionData = await this.actionService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All actions data found successfully',
        actionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const existingAction = await this.actionService.findOne(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Action found successfully',
        existingAction,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateActionDto: UpdateActionDto,
  ) {
    try {
      const existingAction = await this.actionService.update(
        +id,
        updateActionDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Action has been successfully updated',
        existingAction,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedAction = await this.actionService.remove(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Action deleted successfully',
        deletedAction,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/init')
  async initialization(@Res() response) {
    try {
      const actionData = await this.actionService.initialization();
      return response.status(HttpStatus.OK).json({
        message: 'All actions data found successfully',
        actionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
