import { MdOutlineAddToPhotos } from 'react-icons/md';
import { useRef, useState } from 'react';

type SelectPostImageProps = {
  onClickNext: (imageUrl: string, file: File) => void;
};

export const SelectPostImage = ({ onClickNext }: SelectPostImageProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setFile(file);
  };

  const handleNext = () => {
    if (!preview) return;
    if (!file) return;
    onClickNext(preview, file);
  };

  return (
    <div className="w-full max-w-[400px] bg-white rounded-md overflow-auto flex flex-col">
      <div className="flex justify-center p-5">
        <div className='font-bold'>사진 선택</div>
      </div>
      {/* 이미지 선택 영역 */}
      <div onClick={() => fileRef.current?.click()} className="flex-1 px-10 pb-10">
        <div className="flex items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-md overflow-hidden cursor-pointer">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover"
              alt="preview"
            />
          ) : (
            <MdOutlineAddToPhotos className="text-6xl text-gray-400 flex items-center justify-center" />
          )}
        </div>
      </div>

      {preview ? (
        <div
          onClick={handleNext}
          className="bg-red-200 text-xl text-center p-3 rounded-md text-gray-600 cursor-pointer"
        >
          다음
        </div>
      ) : (
        <div></div>
      )}
      {/* 실제 input (숨김처리) */}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        className="hidden"
        onChange={handleImageSelect}
      />
    </div>
  );
};
