import { useEffect, useState } from 'react';
import { apiWithHeader } from '../api/api';

type User = {
  userId: number;
  name: string;
  profileImageUrl: string;
};

type UserListRes = {
  list: User[];
};

export const useFollowData = (userId: number) => {
  const [follower, setFollower] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);

  const [loadingFollower, setLoadingFollower] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchFollower = async () => {
      try {
        setLoadingFollower(true);
        const res = await apiWithHeader.get<UserListRes>(
          `/user/followers/${userId}`
        );
        setFollower(res.data.list);
      } catch (err) {
        console.error('에러: ', err);
      } finally {
        setLoadingFollower(false);
      }
    };

    const fetchFollowing = async () => {
      try {
        setLoadingFollowing(true);
        const res = await apiWithHeader.get<UserListRes>(
          `/user/followings/${userId}`
        );
        setFollowing(res.data.list);
      } catch (err) {
        console.error('에러: ', err);
      } finally {
        setLoadingFollowing(false);
      }
    };
    fetchFollower();
    fetchFollowing();
  }, [userId]);

  return {
    setFollower,
    follower,
    following,
    loadingFollower,
    loadingFollowing,
  };
};
