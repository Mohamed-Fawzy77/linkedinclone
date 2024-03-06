import { Injectable } from '@nestjs/common';
import { Post } from './post.model';
import { CreatePostDto } from './dtos-posts/create-post.dto';
import { User } from '../user/user.model';

@Injectable()
export class PostService {
  async getAllPosts() {
    const posts = await Post.findAll();
    return posts;
  }
  async getPost(id: number) {
    const post = await Post.findByPk(id);
    if (!post) return 'Post not found';
    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    const { userId } = createPostDto;
    const user = await User.findByPk(userId);
    if (!user) return 'User not found';

    const newPost = await Post.create({
      ...createPostDto,
    } as Post);
    return 'Post Added';
  }

  async updatePost(id: number, createPostDto: CreatePostDto) {
    const { userId } = createPostDto;
    const user = await User.findByPk(userId);
    if (!user) return 'User not found';
  }
}
