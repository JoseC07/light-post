import { Request, Response, NextFunction } from 'express'
import { createErrorResponse } from '../utils/apiResponse'
import { CategoryModel } from '../models/Category'

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const trimmedName = name?.trim();
  
  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
    return res.status(400).json(
      createErrorResponse('Category name must be between 2-100 characters', 'INVALID_NAME')
    );
  }
  
  // Prevent whitespace-only names
  if (!trimmedName.replace(/\s+/g, '')) {
    return res.status(400).json(
      createErrorResponse('Category name cannot be only whitespace', 'INVALID_NAME')
    );
  }
  
  next();
}

export const checkDuplicateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await CategoryModel.findByName(req.body.name);
    if (existing) {
      return res.status(409).json(
        createErrorResponse('Category name already exists', 'DUPLICATE_CATEGORY')
      );
    }
    next();
  } catch (error) {
    next(error);
  }
} 