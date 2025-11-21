import { useState } from 'react';
import { SquareImageView } from '../../../../../components/image/SquareImageView';

type InputPostContentProps = {
  imageUrl: string;
  onClickUpload: (content: string) => void;
};

export const InputPostContent = ({
  imageUrl,
  onClickUpload,
}: InputPostContentProps) => {
  const [content, setContent] = useState<string>('');

  return (
    <div className="flex gap-3 p-3 bg-white rounded-md">
      <SquareImageView imageUrl={imageUrl} />
      {/* 오른쪽: 게시글 내용 입력 */}
      <div className="flex flex-col gap-3">
        <textarea
          placeholder="게시글 내용을 작성하세요..."
          className="resize-none w-full h-full min-h-[300px] p-3 border border-gray-200 rounded-md focus:outline-none"
          onChange={(e) => setContent(e.target.value)}
        />
        <div
          className="bg-red-200 text-gray-500 px-4 py-2 rounded-md text-center"
          onClick={() => onClickUpload(content)}
        >
          게시
        </div>
      </div>
    </div>
  );
};
