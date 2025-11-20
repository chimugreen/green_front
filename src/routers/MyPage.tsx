import EachUser from '../components/EachUser';
import { useNavigate } from 'react-router-dom';
import { userInfoStorage } from '../utils/userInfoStorage';

const MyPage = () => {
  const myId = userInfoStorage.getUserId();
  const navigate = useNavigate();

  if (!myId) {
    alert('로그인이 필요합니다.');
    navigate('/login');
    return;
  }
  return <EachUser userId={myId} />;
};

export default MyPage;
