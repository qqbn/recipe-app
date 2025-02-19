import { IsString, IsNotEmpty } from "class-validator";

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    content: string;
}