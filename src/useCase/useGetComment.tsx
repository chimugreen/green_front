import { useCallback, useEffect, useState } from 'react';
import { apiWithHeader } from '../components/api';

export type Comment = {
  id: number;
  userId: number;
  username: string;
  profileImageUrl: string;
  content: string;
  createdAt: string;
};

export type Pagenation = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

type UserCmtRes = {
  comments: Comment[];
  cmtPagenation: Pagenation;
};

type UseGetCmtParams = {
  postId: number;
  page: number;
  size: number;
};

export const useGetComment = ({ postId, page, size }: UseGetCmtParams) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [cmtPagenation, setCmtPagenation] = useState<Pagenation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { setLoadedUserData, loadedUserData, isLoading } = useUserId(userId);

  const loadCmts = useCallback(async () => {
    if (!postId && postId !== 0) return;
    try {
      setIsLoading(true);
      const res = await apiWithHeader.post<UserCmtRes>('/post/user', {
        postId,
        page,
        size,
      });
      setComments((prev) =>
        page === 0 ? res.data.comments : [...prev, ...res.data.comments]);
      setCmtPagenation(res.data.cmtPagenation);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [postId, page, size]);

  useEffect(() => {
    loadCmts();
  }, [loadCmts]);

  return { comments, cmtPagenation, isLoading, refetch: loadCmts };
};
