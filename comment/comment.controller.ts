import { Controller } from '@nestjs/common';
import { Body, Post, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  userService: any;
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    try {
      const comment = await this.commentService.create(
        createCommentDto,
        req.user.id,
      );
      return { success: true, comment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
