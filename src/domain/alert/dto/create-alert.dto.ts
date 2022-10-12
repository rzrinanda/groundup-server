import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlertDto {
    @IsString()
    @IsNotEmpty()
    readonly anomaly: string;

    @IsString()
    @IsNotEmpty()
    readonly reason: string;

    @IsString()
    @IsNotEmpty()
    readonly action: string;

    @IsString()
    @IsNotEmpty()
    readonly comments: string;
}
