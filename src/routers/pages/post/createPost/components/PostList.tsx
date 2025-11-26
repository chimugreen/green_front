// import EachPost from '../../../../../components/EachPost';

// import { useNavigate } from 'react-router-dom';
import type { Pagenation, Post } from '../../../../../useCase/useGetPost';
import React, { useEffect, useRef } from 'react';
import { type PostData } from '../../../../../components/post/EachPost';

type PostListProps = {
  posts: Post[];
  pagenation: Pagenation | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PostList = ({ posts, pagenation, setPage }: PostListProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          // 화면에 보이고, 다음 페이지가 있으면
          entry.isIntersecting &&
          pagenation?.hasNext
        ) {
          // 현재 페이지 + 다음 페이지 요청
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1.0, // sentinel이 완전히 보일 때 트리거
      }
    );
    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [pagenation?.hasNext]);
  return (
    <div>
      <div className="grid grid-cols-3">
        {posts.map((post) => (
          <img
            key={post.id}
            className="aspect-square border-2 border-white cursor-pointer"
            src={post.imageUrl}
            // onClick={() => navigate(`/post/${post.id}`)}
          />
        ))}
      </div>
      {/* 무한 스크롤 트리거 */}
      <div ref={sentinelRef}></div>
      {/* 마지막 페이지 표시 */}
      {!pagenation?.hasNext && posts.length > 0 && <p className='text-center text-gray-400 p-5'>마지막 게시글입니다.</p>}
    </div>
  );
};
