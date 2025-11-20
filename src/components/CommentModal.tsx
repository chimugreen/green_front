import React from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function CommentModal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-4 w-80 h-100 flex flex-col bg-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default CommentModal;
