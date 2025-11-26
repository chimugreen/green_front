// import EachPost from '../../../../../components/EachPost';

// import { SquareImageView } from '../../../../../components/image/SquareImageView';
import {
  type PostData,
} from '../../../../../components/post/EachPost';

type PostListProps = {
  posts: PostData[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid grid-cols-3 grid-">
      {posts.map((post) => (
        <img className="aspect-square border-2 border-white" src={post.post.imageUrl}></img>
      ))}
    </div>
  );
};
