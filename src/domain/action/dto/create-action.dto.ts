import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  readonly actionName: string;
}
