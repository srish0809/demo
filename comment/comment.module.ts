import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/user/jwt.strategy';

@Module({
  providers: [CommentService, JwtStrategy],
  controllers: [CommentController],
  imports:[PrismaModule, JwtModule.register({})]
})
export class CommentModule {}

