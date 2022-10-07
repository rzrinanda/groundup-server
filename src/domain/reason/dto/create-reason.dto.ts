import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReasonDto {
  @IsString()
  @IsNotEmpty()
  readonly machine: string;

  @IsString()
  @IsNotEmpty()
  readonly reason: string;
}
