//둘러보기 - 탐색
// import { SlArrowLeftCircle } from 'react-icons/sl';
import EachPost from '../components/EachPost';
// import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  // const navigate = useNavigate();
  return (
    <>
      <div className="my-1 mx-auto max-w-120">
        <div className="flex items-center my-2">
          {/* <button
            className="flex px-2 hover:cursor-pointer"
            onClick={() => navigate('/')}
          >
            <SlArrowLeftCircle />
          </button> */}
          <p className="font-bold text-xl px-2">make plan</p>
        </div>
        <EachPost />
      </div>
    </>
  );
};

export default SearchPage;
