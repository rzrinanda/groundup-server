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
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) { }

  @Post()
  async create(@Res() response, @Body() createMachineDto: CreateMachineDto) {
    try {
      const newMachine = await this.machineService.create(createMachineDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Machine has been created successfully',
        newMachine,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Machine not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const machineData = await this.machineService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All machines data found successfully',
        machineData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const existingMachine = await this.machineService.findOne(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Machine found successfully',
        existingMachine,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ) {
    try {
      const existingMachine = await this.machineService.update(
        +id,
        updateMachineDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Machine has been successfully updated',
        existingMachine,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedMachine = await this.machineService.remove(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Machine deleted successfully',
        deletedMachine,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/init')
  async initialization(@Res() response) {
    try {
      const machineData = await this.machineService.initialization();
      return response.status(HttpStatus.OK).json({
        message: 'All machines data found successfully',
        machineData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
