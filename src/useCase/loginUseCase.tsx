import { api } from '../components/api';
import { tokenManager } from '../utils/tokenManager';

export const loginUseCase = async (email: string, password: string) => {
  const res = await api.post('/auth/signin', { email, password });
  tokenManager.setAccess(res.data.accessToken);
};
