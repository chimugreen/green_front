import EachUser from '../components/EachUser';
import { useNavigate, useParams } from 'react-router-dom';
import { userInfoStorage } from '../utils/userInfoStorage';

const MyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const myId = Number(userInfoStorage.getUserId());
  const navigate = useNavigate();

  if (!myId) {
    alert('로그인이 필요합니다.');
    navigate('/login');
    return;
  }
  const loadUserId = userId ? Number(userId) : myId;

  return <EachUser userId={loadUserId} />;
};

export default MyPage;
