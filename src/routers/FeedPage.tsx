// 피드 page

import Calender from '../components/Calender';

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
        <div className="w-1/3 flex border-2">
          <p>카테고리 컴포넌트 영역</p>
        </div>
      </div>
    </>
  );
};

export default FeedPage;
