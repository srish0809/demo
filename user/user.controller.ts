import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { success: true, user};
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('login')
  async login(@Body() logindto: LoginUserDto) {
    try {
      const result = await this.userService.login(logindto);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'password', required: false })
  @Get()
  async findAll(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    try {
      const users = await this.userService.findAll(email, password);
      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(+id, updateUserDto);
      return { success: true, updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const userDetail = await this.userService.remove(+id);
      return { success: true, userDetail };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
