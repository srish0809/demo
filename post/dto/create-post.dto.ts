import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostDto {
@ApiProperty()
@IsString()
    content: string;
    userId: number;
}