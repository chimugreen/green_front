import { useState } from 'react';
import { InputPostContent } from './components/InputPostContent';
import { SelectPostImage } from './components/SelectPostImage';
import { createPostUseCase } from '../../../../useCase/postUseCase/createPostUseCase';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImageSelected = (imageUrl: string, file: File) => {
    setImageUrl(imageUrl);
    setFile(file);
    setStep(2);
  };

  const handleUpload = (content: string) => {
    if (!file) return;

    try {
      const upload = async () => {
        const postId = await createPostUseCase({ file, content });
        alert(`게시물이 업로드되었습니다! (ID: ${postId})`);
        navigate('/postfeed');
      };
      upload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col justify-center items-center">
      {step === 1 && <SelectPostImage onClickNext={handleImageSelected} />}
      {step === 2 && (
        <InputPostContent imageUrl={imageUrl} onClickUpload={handleUpload} />
      )}
    </div>
  );
};

export default CreatePost;
