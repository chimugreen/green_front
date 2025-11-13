import React, { useState } from 'react';
import logo from '../img/icon.png';
import feedPic from '../img/feedpic.jpg';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
// import { IoMdHeart } from 'react-icons/io';
import { CgComment } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';

// 인스타 게시글 1개
const EachPost = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // 댓글 기능
  const [comment, setComment] = useState(''); // 작성한 댓글을 담을 state
  const [comments, setComments] = useState<string[]>([]); // 댓글 리스트 담을 state
  // 좋아요 기능
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Number);

  // 좋아요 기능
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  // 댓글 추가 기능
  const handleCommentPost = () => {
    // 빈 문자열 등록 불가
    if (!comment.trim()) return;
    // 기존 댓글에 현재 댓글 추가
    setComments((prev) => [...prev, comment]);
    // input 비우기
    setComment('');
  };

  // 댓글 목록 열기
  const handleCommentList = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col max-w-120 items-center mx-auto">
      {/* 헤더 */}
      <div className="flex items-center w-screen max-w-120 p-2">
        <img
          className="size-10 float-left rounded-full cursor-pointer"
          src={logo}
          alt="프로필 사진"
          onClick={() => navigate('/userDetail')}
        />
        <p className="font-bold px-2">nickname</p>
      </div>
      <img src={feedPic} alt="피드 사진" />
      {/* 좋아요, 댓글 */}
      <div className="flex max-w-120 w-screen p-2 gap-2 items-center font-bold">
        <button className="cursor-pointer" onClick={handleLike}>
          {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
        </button>
        <p className="font-bold">{likes}</p>
        <CgComment onClick={handleCommentList} className="cursor-pointer" />
        <p>{comments.length}</p>
      </div>
      <div className="flex max-w-120 w-screen px-2">
        <span className="font-bold pr-2">nickname</span>
        <p>context</p>
      </div>
      {/* 댓글 리스트 표시*/}
      <CommentModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <p className="w-auto p-2 text-center font-bold rounded-lg mb-1.5">
          댓글 목록
        </p>
        <div className="w-auto">
          {comments.map((c, idx) => (
            <div
              key={idx}
              className="flex gap-2 text-sm p-2 bg-white rounded-lg mb-1.5"
            >
              <span className="font-bold">user{idx + 1}</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </CommentModal>
      {/* 댓글 달기 구현부 */}
      <div className="max-w-120 w-screen px-2">
        <input
          className="text-start py-0.5"
          placeholder="댓글 달기..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="float-right px-1.5 py-0.5 rounded-md cursor-pointer bg-blue-300 text-white"
          onClick={handleCommentPost}
          disabled={!comment.trim()}
        >
          게시
        </button>
      </div>
    </div>
  );
};

export default EachPost;
