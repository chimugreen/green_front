import { apiWithHeader } from '../../components/api';

type CreatePostProps = {
  file: File;
  content: string;
};

export const createPostUseCase = async ({
  file,
  content,
}: CreatePostProps): Promise<number> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('content', content);

  const res = await apiWithHeader.post('/post', formData);
  const id = res.data.postId;
  return id;
};
