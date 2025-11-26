import { useCallback, useEffect, useState } from 'react';
import { apiWithHeader } from '../components/api';

export type Post = {
  id: number;
  content: string;
  createdAt: string;
  imageUrl: string;
  userId: number;
  username: string;
  profileImageUrl: string;
  likesCnt: number;
  commentsCnt: number;
};

export type Pagenation = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

type UserPostRes = {
  posts: Post[];
  pagenation: Pagenation;
};

type UseGetPostParams = {
  userId: number;
  page: number;
  size: number;
};

export const useGetPost = ({ userId, page, size }: UseGetPostParams) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagenation, setPagenation] = useState<Pagenation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { setLoadedUserData, loadedUserData, isLoading } = useUserId(userId);

  const loadPosts = useCallback(async () => {
    if (!userId && userId !== 0) return;
    try {
      setIsLoading(true);
      const res = await apiWithHeader.post<UserPostRes>('/post/user', {
        userId,
        page,
        size,
      });
      setPosts((prev) =>
        page === 0 ? res.data.posts : [...prev, ...res.data.posts]);
      setPagenation(res.data.pagenation);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, page, size]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return { posts, pagenation, isLoading, refetch: loadPosts };
};
