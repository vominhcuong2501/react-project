export interface PostProps {
  postList: [];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostDetailProps {
  post: Post;
}
