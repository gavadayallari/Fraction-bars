interface TapToStartProps {
  firstTap: boolean;
  setFirstTap: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartGame: () => void;
}

const TapToStart = ({
  firstTap,
  setFirstTap,
  handleStartGame
}: TapToStartProps) => {
  return firstTap ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setFirstTap(false);
        handleStartGame();
      }}
      className="do-no-capture fixed inset-0 z-[9999] bg-black/50 backdrop-blur-xs cursor-pointer flex flex-col items-center justify-center"
    >
      <div className="md:text-6xl text-4xl font-bold text-white">
        Tap to start
      </div>
    </div>
  ) : null;
};

export default TapToStart;