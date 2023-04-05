import { HttpStatus, Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { query } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import {
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const emailUser = await this.prisma.user.findFirst({
        where: { email: createUserDto.email },
      });
      if (emailUser) {
        throw new UnprocessableEntityException('User already exists');
      }
      const saltrounds = 10;
      const password = await bcrypt.hash(createUserDto.password, saltrounds);
      const user = await this.prisma.user.create({
        data: {
          first_name: createUserDto.firstName,
          last_name: createUserDto.lastName,
          email: createUserDto.email,
          password: password,
        },
      });

      return {
        user: `id: ${user.id}, name: ${user.first_name}, email: ${user.email}`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(email: string, password: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: email },
      });
      if (!user) {
        throw new UnauthorizedException('user not found');
      }

      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new UnauthorizedException('password incorrect');
      }
      return {
        message: `${user.id}, name=${user.first_name}, email=${user.email}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.prisma.user.findFirst({ where: { id: id } });
      if (!result) {
        throw new UnauthorizedException('user not found');
      }
      return await this.prisma.user.update({
        where: { id: id },
        data: updateUserDto,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      const result = await this.prisma.user.delete({ where: { id: id } });
      return {
        DeletedUser: `id= ${id}, name=${user.first_name}`,
        status: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async login(loginDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: loginDto.email },
      });
      console.log(user);

      if (!user) {
        throw new NotFoundException();
      }

      const result = await bcrypt.compare(loginDto.password, user.password);

      console.log(result);

      if (!result) {
        throw new UnauthorizedException('invalid Credentials');
      }
      const payload = { userId: user.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.secret_key,
        }),
      };
    } catch (error) {
      console.error(error);
    }
  }
}
