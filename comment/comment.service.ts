import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}
  async create(createCommentDto: CreateCommentDto, userId: number) {
    try {
      const res = await this.prisma.comment.create({
        data: {
          content: createCommentDto.content,
          userId: userId,
          postId: createCommentDto.postId,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
