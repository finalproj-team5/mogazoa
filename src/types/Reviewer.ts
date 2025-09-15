export interface Reviewer {
  id: number;
  nickname: string;
  image: string;
  description: string;
  teamId: string;
  reviewCount: number;
  followersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
  imageUrl?: string;
}
