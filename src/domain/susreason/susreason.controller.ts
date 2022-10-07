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
import { SusreasonService } from './susreason.service';
import { CreateSusreasonDto } from './dto/create-susreason.dto';
import { UpdateSusreasonDto } from './dto/update-susreason.dto';

@Controller('susreason')
export class SusreasonController {
  constructor(private readonly susreasonService: SusreasonService) {}

  @Post()
  async create(
    @Res() response,
    @Body() createSusreasonDto: CreateSusreasonDto,
  ) {
    try {
      const newSusreason = await this.susreasonService.create(
        createSusreasonDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Suspected Reason has been created successfully',
        newSusreason,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Suspected Reason not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const reasonData = await this.susreasonService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All reasons data found successfully',
        reasonData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const existingSusreason = await this.susreasonService.findOne(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Suspected Reason found successfully',
        existingSusreason,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateSusreasonDto: UpdateSusreasonDto,
  ) {
    try {
      const existingSusreason = await this.susreasonService.update(
        +id,
        updateSusreasonDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Suspected Reason has been successfully updated',
        existingSusreason,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedSusreason = await this.susreasonService.remove(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Suspected Reason deleted successfully',
        deletedSusreason,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/init')
  async initialization(@Res() response) {
    try {
      const actionData = await this.susreasonService.initialization();
      return response.status(HttpStatus.OK).json({
        message: 'All Suspected Reason data found successfully',
        actionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
