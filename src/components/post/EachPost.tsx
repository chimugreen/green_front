import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { CgComment } from 'react-icons/cg';
import CommentModal from '../CommentModal';
import type { Post } from '../../useCase/useGetPost';
import { useUserId } from '../../useCase/useUserId';
import logo from '../../components/image/icon.png';
import { useGetComment } from '../../useCase/useGetComment';

export type PostData = {
  user: {
    name: string;
    profileImageUrl: string;
  };
  post: {
    id: number;
    imageUrl: string;
    content: string;
    likesCnt: number;
    commentsCnt: number;
    createdAt: Date;
  };
};

export type Comment = {
  user: {
    name: string;
    profileImageUrl: string;
  };
  comment: {
    id: number;
    userId: number;
    username: string;
    profileImageUrl: string;
    content: string;
    createdAt: Date;
  };
};

type EachPostDataProps = {
  postData: PostData;
};

// type EachPostProps = {
//   post: Post;
// }

// 인스타 게시글 1개
export const EachPost = ({ postData }: EachPostDataProps) => {
  const { userId } = useParams<{ userId: string }>();
  const { setLoadedUserData, loadedUserData, isLoading } = useUserId(userId);
  const { comments, cmtPagenation, refetch: loadCmts } = useGetComment({
    postId: postData.post.id,
    page: 0,
    size: 10,
  });
  console.log('postData?', postData);
  // 댓글창, 댓글, 좋아요
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // const [comment, setComment] = useState('');
  // const [comments, setComments] = useState<string[]>([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // 댓글 목록 열기
  const handleCommentList = () => {
    setModalOpen(true);
    loadCmts();
  };
  // // 댓글 추가 기능
  // const handleCommentPost = () => {
  //   if (!comment.trim()) return;
  //   setComments((prev) => [...prev, comment]);
  //   setComment('');
  // };

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

  return (
    <div className="flex flex-col max-w-100 items-center mx-auto mb-3">
      {/* 헤더 */}
      <div className="flex items-center w-screen max-w-100 p-2">
        <img
          className="size-10 float-left rounded-full cursor-pointer"
          src={postData.user.profileImageUrl}
          alt="프로필 사진"
          onClick={() => navigate(`/user/${postData.user.profileImageUrl}`)}
        />
        <p className="font-bold px-2">{postData.user.name}</p>
      </div>
      <img src={postData.post.imageUrl} alt="피드 사진" />
      <div>
        {/* 좋아요, 댓글 */}
        <div className="flex max-w-100 w-screen p-2 gap-2 items-center font-bold">
          <button className="cursor-pointer" onClick={handleLike}>
            {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
          <p className="font-bold">{postData.post.likesCnt}</p>
          <CgComment onClick={handleCommentList} className="cursor-pointer" />
          <p>{postData.post.commentsCnt}</p>
        </div>
        <div className="flex max-w-100 w-screen px-2">
          <span className="font-bold pr-2">{postData.user.name}</span>
          <p>{postData.post.content}</p>
        </div>
        {/* 댓글 달기 구현부 */}
        <div className="max-w-100 w-screen px-2">
          <input
            className="text-start py-0.5"
            placeholder="댓글 달기..."
            // value={comment}
            // onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="float-right px-1.5 py-0.5 rounded-md cursor-pointer bg-red-200 text-white"
            // onClick={handleCommentPost}
            // disabled={!comment.trim()}
          >
            게시
          </button>
        </div>
        <CommentModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div>
            <p className="font-bold text-center w-full p-3">댓글</p>
            <div className="w-full my-2 p-3 rounded-md bg-white">
              <div className="flex">
                {comments.map((cmt) => (
                  <div key={cmt.id}>
                    <img src={cmt.profileImageUrl} alt="프로필 사진" />
                    <p>{cmt.username}</p>
                    <p>{cmt.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CommentModal>
      </div>
    </div>
  );
};
