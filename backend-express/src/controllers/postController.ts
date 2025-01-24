import { Request, Response, NextFunction } from 'express';
import { Post } from '../types';
import PostModel from '../models/Post';
import { createSuccessResponse, createErrorResponse } from '../utils/apiResponse';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      categoryId,
      tags,
      page = 1,
      limit = 10
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    
    const result = await PostModel.findAllWithFilters({
      category_id: categoryId ? Number(categoryId) : undefined,
      tags: typeof tags === 'string' ? tags.split(',') : undefined,
      limit: Number(limit),
      offset
    });
    
    res.json(createSuccessResponse({
      posts: result.posts,
      pagination: {
        total: result.total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(result.total / Number(limit))
      }
    }));
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await PostModel.findById(Number(req.params.id));
    if (!post) {
      return res.status(404).json(createErrorResponse('Post not found'));
    }
    res.json(createSuccessResponse(post));
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category_id, tags, location } = req.body;
    
    if (!title || !content || !category_id) {
      return res.status(400).json(
        createErrorResponse('Title, content, and category are required')
      );
    }

    const post = await PostModel.create({
      title,
      content,
      category_id,
      tags,
      location
    });

    res.status(201).json(createSuccessResponse(post));
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);
    const updates = req.body;

    const post = await PostModel.update(postId, updates);
    if (!post) {
      return res.status(404).json(createErrorResponse('Post not found'));
    }

    res.json(createSuccessResponse(post));
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);
    const hardDelete = req.query.hard === 'true';

    const success = await PostModel.delete(postId, !hardDelete);
    if (!success) {
      return res.status(404).json(createErrorResponse('Post not found'));
    }

    res.json(createSuccessResponse({ message: 'Post deleted successfully' }));
  } catch (error) {
    next(error);
  }
}; 