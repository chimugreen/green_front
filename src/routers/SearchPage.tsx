// 둘러보기 - 탐색 페이지
import { useNavigate } from 'react-router-dom';
import { EachPost, type PostData } from '../components/post/EachPost';

const mockPosts: PostData[] = [
  {
    user: {
      name: 'jiyun',
      profileImageUrl: 'https://picsum.photos/seed/user1/200',
    },
    post: {
      id: 1,
      imageUrl: 'https://picsum.photos/seed/post1/600',
      content: '오늘 카페에서 공부했어 ☕️',
      likeCnt: 12,
      commentCnt: 3,
      createdAt: new Date('2025-01-01T10:20:00'),
    },
  },
  {
    user: {
      name: 'haru',
      profileImageUrl: 'https://picsum.photos/seed/user2/200',
    },
    post: {
      id: 2,
      imageUrl: 'https://picsum.photos/seed/post2/600',
      content: '새해 첫 등산! 🧗‍♀️',
      likeCnt: 25,
      commentCnt: 5,
      createdAt: new Date('2025-01-03T14:10:00'),
    },
  },
  {
    user: {
      name: 'maki',
      profileImageUrl: 'https://picsum.photos/seed/user3/200',
    },
    post: {
      id: 3,
      imageUrl: 'https://picsum.photos/seed/post3/600',
      content: '고양이 너무 귀여워 😺',
      likeCnt: 40,
      commentCnt: 8,
      createdAt: new Date('2025-01-05T09:00:00'),
    },
  },
  {
    user: {
      name: 'tomo',
      profileImageUrl: 'https://picsum.photos/seed/user4/200',
    },
    post: {
      id: 4,
      imageUrl: 'https://picsum.photos/seed/post4/600',
      content: '오늘은 헬스장에서 땀 좀 뺐다 💪',
      likeCnt: 18,
      commentCnt: 1,
      createdAt: new Date('2025-01-07T18:30:00'),
    },
  },
  {
    user: {
      name: 'yuri',
      profileImageUrl: 'https://picsum.photos/seed/user5/200',
    },
    post: {
      id: 5,
      imageUrl: 'https://picsum.photos/seed/post5/600',
      content: '도쿄 야경 너무 예쁘다 🌃',
      likeCnt: 33,
      commentCnt: 6,
      createdAt: new Date('2025-01-09T21:45:00'),
    },
  },
  {
    user: {
      name: 'min',
      profileImageUrl: 'https://picsum.photos/seed/user6/200',
    },
    post: {
      id: 6,
      imageUrl: 'https://picsum.photos/seed/post6/600',
      content: '요즘 공부 재미있다 📚',
      likeCnt: 9,
      commentCnt: 0,
      createdAt: new Date('2025-01-12T08:20:00'),
    },
  },
];

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
          >+</button>
        </div>
      </div>
      <div>
        {mockPosts.map((post) => (
          <EachPost postData={post} key={post.post.id}></EachPost>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
