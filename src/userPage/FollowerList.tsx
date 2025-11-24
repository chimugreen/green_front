import { useNavigate } from 'react-router-dom';
import { useFollowData } from '../hooks/useFollowData';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  // children?: React.ReactNode;
  userId: number;
};

function FollowerList({ open, onClose, userId }: ModalProps) {
  const { follower, loadingFollower } = useFollowData(userId);
  const navigate = useNavigate();

  // const goUserPage = () => {
  //   navigate(`/user/${userId}`);
  //   onclick={onclose}
  // }
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-gray-200 rounded-2xl p-4 w-80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <p className="font-bold text-center p-2 my-1.5">팔로워</p>
          {loadingFollower ? (
            <p>로딩 중 。。。</p>
          ) : (
            follower.map((u) => (
              <div key={u.userId}>
                <div
                  className="flex bg-white rounded-md p-2 my-1.5 cursor-pointer"
                  onClick={() => {
                    navigate(`/user/${u.userId}`);
                    onClose();
                  }}
                >
                  <img
                    src={u.profileImageUrl}
                    alt="프로필 사진"
                    className="size-10 float-left rounded-full mx-1 flex items-center"
                  />
                  <p className="px-2 flex items-center font-bold">{u.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowerList;
