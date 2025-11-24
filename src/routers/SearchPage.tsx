// 둘러보기 - 탐색 페이지
import EachPost from '../components/EachPost';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  return (
    <div className="my-1 mx-auto max-w-120">
      <div className="flex items-center my-2">
        <div className="mt-2 py-2 px-4 bg-red-200 text-gray-600 w-screen flex justify-between rounded-md">
          <p className="font-bold text-xl w-auto">make plan</p>
          <button
            className="font-bold float-right cursor-pointer"
            onClick={() => navigate('/createPost')}
          >
            +
          </button>
        </div>
      </div>
      <EachPost />
    </div>
  );
};

export default SearchPage;
