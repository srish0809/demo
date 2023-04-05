import {
  Body,
  Get,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  userService: any;
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    try {
      const post = await this.postService.create(createPostDto, req.user.id);
      return { success: true, post };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get()
  async get() {
    try {
      const posts = await this.postService.findAll();
      return { success: true, posts };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
