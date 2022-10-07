import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnomalyService } from './anomaly.service';
import { CreateAnomalyDto } from './dto/create-anomaly.dto';
import { UpdateAnomalyDto } from './dto/update-anomaly.dto';

@Controller('anomaly')
export class AnomalyController {
  constructor(private readonly anomalyService: AnomalyService) {}

  @Post()
  create(@Body() createAnomalyDto: CreateAnomalyDto) {
    return this.anomalyService.create(createAnomalyDto);
  }

  @Get()
  findAll() {
    return this.anomalyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anomalyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnomalyDto: UpdateAnomalyDto) {
    return this.anomalyService.update(+id, updateAnomalyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anomalyService.remove(+id);
  }
}
