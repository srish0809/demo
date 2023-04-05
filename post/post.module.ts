import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/user/jwt.strategy';


@Module({
  providers: [PostService, JwtStrategy],
  controllers: [PostController],
  imports:[PrismaModule,JwtModule.register({})]
})
export class PostModule {}
