import { VscAccount, VscSearch, VscBell } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
// import { userInfoStorage } from '../../utils/userInfoStorage';

export const MainFooter = () => {
  const navigate = useNavigate();
  // const myId = userInfoStorage.getUserId();

  return (
    <footer className="fixed bottom-0 w-full overflow-hidden bg-white">
      <div className="flex justify-center gap-10 py-4">
        <button
          className="cursor-pointer flex flex-col
           items-center text-gray-700 font-bold"
          onClick={() => navigate('/todoCalendar')}
        >
          <IoHomeOutline />
          피드
        </button>
        <button
          className="cursor-pointer flex flex-col
           items-center text-gray-700 font-bold"
          onClick={() => navigate('/postFeed')}
        >
          <VscSearch />
          탐색
        </button>
        <button
          className="cursor-pointer flex flex-col
           items-center text-gray-700 font-bold"
          onClick={() => navigate('/alert')}
        >
          <VscBell />
          알림
        </button>
        <button
          className="cursor-pointer flex flex-col
           items-center text-gray-700 font-bold"
          onClick={() => navigate('/user/my')}
        >
          <VscAccount />
          My
        </button>
      </div>
    </footer>
  );
};
