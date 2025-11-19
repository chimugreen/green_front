// 피드 page

import Calender from '../components/Calender';
import Category from '../components/Category';

const FeedPage = () => {
  return (
    <>
      <header>헤더 아이콘 미작업 영역</header>
      <hr />
      <div className="flex justify-around items-center h-screen ">
        <div className="w-1/3 h-100 flex flex-col rounded-2xl">
          <div>
            <Calender />
          </div>
        </div>{' '}
        <div className="w-1/3 h-100 flex flex-col border-2 p-2">
          {<Category />}
        </div>
      </div>
    </>
  );
};

export default FeedPage;
