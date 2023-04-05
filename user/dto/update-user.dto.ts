import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {

    @ApiProperty()
    @IsOptional()
@IsString()
    first_name: string;


    @ApiProperty()
    @IsOptional()
@IsString()
    last_name: string;

}
