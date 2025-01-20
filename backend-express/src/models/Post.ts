import BaseModel from './BaseModel';
import { Post } from '../types';

interface CreatePostData {
  title: string;
  content: string;
  category_id: number;
  tags?: string[];
}

export class PostModel extends BaseModel {
  constructor() {
    super('posts');
  }

  async create(data: CreatePostData): Promise<Post> {
    const query = `
      INSERT INTO posts (title, content, category_id, tags)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.executeQuery<Post>(
      query,
      [data.title, data.content, data.category_id, data.tags]
    );
    return result.rows[0];
  }

  async findByCategory(categoryId: number): Promise<Post[]> {
    const query = `
      SELECT p.*, c.name as category_name
      FROM posts p
      JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = $1
      ORDER BY p.created_at DESC
    `;
    const result = await this.executeQuery<Post>(query, [categoryId]);
    return result.rows;
  }

  async updateVotes(id: number, upvotes: number, downvotes: number): Promise<Post> {
    const query = `
      UPDATE posts
      SET upvotes = $2, downvotes = $3, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await this.executeQuery<Post>(query, [id, upvotes, downvotes]);
    return result.rows[0];
  }
}

export default new PostModel(); 