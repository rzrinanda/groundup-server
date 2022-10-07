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
import { ReasonService } from './reason.service';
import { CreateReasonDto } from './dto/create-reason.dto';
import { UpdateReasonDto } from './dto/update-reason.dto';

@Controller('reason')
export class ReasonController {
  constructor(private readonly reasonService: ReasonService) {}

  @Post()
  async create(@Res() response, @Body() createReasonDto: CreateReasonDto) {
    try {
      const newReason = await this.reasonService.create(createReasonDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Reason has been created successfully',
        newReason,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const reasonData = await this.reasonService.findAll();
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
      const existingReason = await this.reasonService.findOne(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Reason found successfully',
        existingReason,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateReasonDto: UpdateReasonDto,
  ) {
    try {
      const existingReason = await this.reasonService.update(
        +id,
        updateReasonDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Reason has been successfully updated',
        existingReason,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedReason = await this.reasonService.remove(+id);
      return response.status(HttpStatus.OK).json({
        message: 'Reason deleted successfully',
        deletedReason,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/init')
  async initialization(@Res() response) {
    try {
      const actionData = await this.reasonService.initialization();
      return response.status(HttpStatus.OK).json({
        message: 'All reasons data found successfully',
        actionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
