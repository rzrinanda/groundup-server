import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSusreasonDto {

    @IsString()
    @IsNotEmpty()
    readonly reason : string
}
