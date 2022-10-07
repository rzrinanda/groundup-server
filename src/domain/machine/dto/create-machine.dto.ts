import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  readonly machineName: string;

  @IsBoolean()
  readonly isActive: boolean;
}
