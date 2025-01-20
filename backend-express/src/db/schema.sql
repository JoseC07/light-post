-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category_id INT NOT NULL REFERENCES categories(id),
  tags VARCHAR[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  CONSTRAINT valid_status CHECK (status IN ('pending', 'verified', 'flagged'))
);

-- Create votes table
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(id),
  user_identifier VARCHAR(255),
  vote INT CHECK (vote IN (1, -1)),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, user_identifier)
);

-- Create indexes
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_votes_post ON votes(post_id);
CREATE INDEX idx_posts_status ON posts(status); 