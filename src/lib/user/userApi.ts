import { getAuthToken } from '../authApi';

const API_BASE_URL = 'https://mogazoa-api.vercel.app';
const TEAM_ID = '16-5';

export interface User {
  id: number;
  nickname: string;
  description: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDetail extends User {
  mostFavoriteCategory: {
    id: number;
    name: string;
  } | null;
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

export interface UserFollowersResponse {
  nextCursor: number | null;
  list: {
    id: number;
    follower: User;
  }[];
}

export interface UserFolloweesResponse {
  nextCursor: number | null;
  list: {
    id: number;
    followee: User;
  }[];
}

export const getUserProfile = async (userId: string): Promise<UserDetail> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch user profile');
  }

  return response.json();
};

export const followUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to follow user');
  }
};

export const unfollowUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/follow`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to unfollow user');
  }
};

export const getFollowers = async (
  userId: number,
  cursor?: number,
): Promise<UserFollowersResponse> => {
  const url = new URL(`${API_BASE_URL}/${TEAM_ID}/users/${userId}/followers`);
  if (cursor) {
    url.searchParams.append('cursor', cursor.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch followers');
  }

  return response.json();
};

export const getFollowees = async (
  userId: number,
  cursor?: number,
): Promise<UserFolloweesResponse> => {
  const url = new URL(`${API_BASE_URL}/${TEAM_ID}/users/${userId}/followees`);
  if (cursor) {
    url.searchParams.append('cursor', cursor.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch followees');
  }

  return response.json();
};

// 내 정보 조회 (마이페이지용)
export const getMyProfile = async (): Promise<UserDetail> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/users/me`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch my profile');
  }

  return response.json();
};

export interface UpdateUserData {
  nickname?: string;
  description?: string;
  image?: string;
}

// 내 정보 수정
export const updateMyProfile = async (data: UpdateUserData): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  return response.json();
};

export interface ImageUploadResponse {
  url: string;
}

// 이미지 업로드
export const uploadImage = async (imageFile: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/images/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload image');
  }

  return response.json();
};
