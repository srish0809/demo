import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

import { FileuploadService } from './fileupload/fileupload.service';
import { FileuploadModule } from './fileupload/fileupload.module';
import { UploadController } from './fileupload/fileupload.controller';


@Module({
  imports: [UserModule, PrismaModule, CommentModule, PostModule, FileuploadModule],
  controllers: [AppController,UploadController],
  providers: [AppService, FileuploadService],
})


export class AppModule {}
