import { Request, Response, NextFunction } from 'express';
import { Post } from '../types';
import PostModel from '../models/Post';
import { createSuccessResponse, createErrorResponse } from '../utils/apiResponse';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    
    let posts: Post[];
    if (categoryId) {
      posts = await PostModel.findByCategory(categoryId);
    } else {
      posts = await PostModel.findAll();
    }
    
    res.json(createSuccessResponse(posts));
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category_id, tags } = req.body;
    
    if (!title || !content || !category_id) {
      return res.status(400).json(
        createErrorResponse('Title, content, and category are required')
      );
    }

    const post = await PostModel.create({
      title,
      content,
      category_id,
      tags
    });

    res.status(201).json(createSuccessResponse(post));
  } catch (error) {
    next(error);
  }
}; 