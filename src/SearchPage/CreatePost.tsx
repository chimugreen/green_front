import { useState } from 'react';
import logo from '../img/icon.png';

const CreatePost = () => {
  const [context, setContext] = useState('');
  //     const [contexts, setContexts] =

  //   const handlePost = () => {
  //     if(context == );
  //   };

  return (
    <div className="flex flex-col">
      <p>게시물 작성하기</p>
      <div>
        <img
          src={logo}
          alt="프로필 사진"
          className="size-10 float-left rounded-full cursor-pointer"
        />
        <p>nickname</p>
      </div>
      <input
        type="text"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        className=""
      />
      <button disabled={!context.trim()}>게시</button>
    </div>
  );
};

export default CreatePost;
