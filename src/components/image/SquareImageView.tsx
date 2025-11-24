export const SquareImageView = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-md overflow-hidden">
      <img
        src={imageUrl}
        className="w-full h-full object-cover"
        alt={imageUrl}
      />
    </div>
  );
};
