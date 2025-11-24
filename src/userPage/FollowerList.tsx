type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function FollowerList({ open, onClose, children }: ModalProps) {
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
        {children}
      </div>
    </div>
  );
}

export default FollowerList;
