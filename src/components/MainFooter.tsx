import { VscAccount, VscSearch, VscBell } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const MainFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="absolute bottom-3 w-full overflow-hidden">
      <div className="flex justify-center gap-10">
        <button
          className="cursor-pointer flex flex-col
           items-center"
          onClick={() => navigate('/todoCalendar')}
        >
          <IoHomeOutline />
          피드
        </button>
        <button
          className="cursor-pointer flex flex-col
           items-center"
          onClick={() => navigate('/postFeed')}
        >
          <VscSearch />
          탐색
        </button>
        <button
          className="cursor-pointer flex flex-col
           items-center"
          onClick={() => navigate('/alert')}
        >
          <VscBell />
          알림
        </button>
        <button
          className="cursor-pointer flex flex-col
           items-center"
          onClick={() => navigate('/user/:userId')}
        >
          <VscAccount />
          My
        </button>
      </div>
    </footer>
  );
};
