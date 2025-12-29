export type News = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  publishedAt?: string;
  author?: {
    id: string;
    name: string;
  };
  name?: string;
};
