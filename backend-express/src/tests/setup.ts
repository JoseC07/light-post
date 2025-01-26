// This file is required by jest.config.js
// Add any global test setup here
import { readFileSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import pool from '../config/database';

dotenv.config();

let isPoolEnded = false;

export const initializeTestDatabase = async () => {
  try {
    // Create tables
    await pool.getPool().query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        status VARCHAR(20) DEFAULT 'active',
        location JSONB,
        tags TEXT[],
        upvotes INTEGER DEFAULT 0,
        downvotes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
      );
    `);

    // Insert test data
    await pool.getPool().query(`
      INSERT INTO categories (name) 
      VALUES ('Test Category 1'), ('Test Category 2')
      ON CONFLICT DO NOTHING;
    `);

    console.log('Test database initialized successfully');
  } catch (error) {
    console.error('Error initializing test database:', error);
    throw error;
  }
};

beforeAll(async () => {
  await initializeTestDatabase();
});

beforeEach(async () => {
  // Clean up test data before each test
  try {
    await pool.getPool().query('DELETE FROM posts');
    await pool.getPool().query('DELETE FROM categories');
  } catch (error) {
    console.error('Error cleaning up test data:', error);
  }
});

afterAll(async () => {
  if (!isPoolEnded) {
    try {
      await pool.getPool().query('DELETE FROM posts');
      await pool.getPool().query('DELETE FROM categories');
      await pool.close();
      isPoolEnded = true;
    } catch (error) {
      console.error('Error in test cleanup:', error);
    }
  }
}); 