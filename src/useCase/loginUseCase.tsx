import { api } from '../components/api';
import { tokenManager } from '../utils/tokenManager';
import { userInfoStorage } from '../utils/userInfoStorage';

export const loginUseCase = async (email: string, password: string) => {
  const res = await api.post('/auth/signin', { email, password });
  tokenManager.setAccess(res.data.accessToken);
  userInfoStorage.setUserId(res.data.userId);
};
