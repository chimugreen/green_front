import { useEffect, useState } from 'react';
import { apiWithHeader } from '../components/api';

interface User {
  name: string;
  email: string;
  profileImageUrl: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export const useUserId = (userId: number) => {
  const [loadedUserData, setLoadedUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const res = await apiWithHeader.get(`/user/${userId}`);
        setLoadedUserData(res.data);
        console.log('user api result:', res.data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [userId]);
  return { setLoadedUserData, loadedUserData, isLoading };
};
