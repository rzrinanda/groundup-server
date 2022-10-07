import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnomalyDto {
    // @IsString()
    // @IsNotEmpty()
    readonly timestamp: string;

    @IsString()
    @IsNotEmpty()
    readonly machine: string;

    @IsString()
    @IsNotEmpty()
    readonly anomalyName: string;

    // @IsString()
    // @IsNotEmpty()
    readonly sensor: string

    @IsString()
    @IsNotEmpty()
    readonly soundClip: string
}
