import { PartialType } from '@nestjs/mapped-types';
import { CreateSusreasonDto } from './create-susreason.dto';

export class UpdateSusreasonDto extends PartialType(CreateSusreasonDto) {}
