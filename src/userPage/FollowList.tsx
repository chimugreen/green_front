import React, { useState } from 'react';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import { SlArrowLeftCircle } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

const FollowList = () => {
  const [pageChange, setPageChange] = useState<string>('');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col max-w-120 mx-auto my-5">
      <div className="my-1 mx-auto max-w-120">
        <div className="flex items-center my-2 w-screen">
          <button
            className="flex px-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <SlArrowLeftCircle />
          </button>
          <p className="font-bold text-xl px-2">make plan</p>
        </div>
      </div>
      <div>FollowList</div>
      <div>
        {pageChange === 'Follower' && <FollowerList />}
        {pageChange === 'Following' && <FollowingList />}
      </div>
    </div>
  );
};

export default FollowList;
