import React, { useState } from 'react';
import { api } from '../api/api';

interface User {
  id: number;
  name: string;
  email: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await api.get('/user');
  };

  return (
    <div>
      <div>UserList</div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            닉네임: {u.email}, 이메일: {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
