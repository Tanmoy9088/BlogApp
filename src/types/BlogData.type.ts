export type Post = {
  id: string;
  title: string;
  subtitle: string;
  created_at: string;
  slug: string;
  category: string;
  excerpt: string;
  main_content: string;
  featured_image: string;
  user: User;
  user_id: string;
  updated_at: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  comments: Comment[];
};
export interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}
export interface User {
  id: number;
  name: string;
  avatar: string;
  username: string;
  address_id:string;
  contact_id:string;
  created_at:string;
  email:string;
  first_name:string;
  middle_name:string;
  last_name:string;
  profile_pic:string;
  role:string;
  
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface BlogData {
  posts: Post[];
  categories: Category[];
  authors: User[];
}
