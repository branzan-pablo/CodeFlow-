export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: Category;
  readTime: number; // em minutos
  featured: boolean;
  coverImage?: string;
  metaDescription?: string;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  avatar?: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface PostFilters {
  category?: string;
  tag?: string;
  author?: string;
  featured?: boolean;
  search?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
}
