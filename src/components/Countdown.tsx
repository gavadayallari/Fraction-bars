import TimerSvg from "@/assets/TimerSvg";
import { formatTime } from "@/lib/utils";
import type { GameStateType } from "@/types/TGames";
import { useEffect, useRef } from "react";

const CountdownTimer = ({
  initialTime,
  gameState,
  setGameState,
  onTimeUp,
  gameName,
  freeze = false,
  hideTimer = false,
}: {
  initialTime: number;
  gameState: GameStateType;
  setGameState: React.Dispatch<React.SetStateAction<GameStateType>>;
  onTimeUp: () => void;
  gameName?: string;
  freeze?: boolean;
  hideTimer?: boolean;
}) => {
  const { isPlaying, timeLeft } = gameState;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hideTimer) {
      setGameState((prev) => ({
        ...prev,
        timeLeft: initialTime,
      }));
    }
  }, [initialTime, setGameState, hideTimer]);

  useEffect(() => {
    if (hideTimer || !isPlaying || freeze) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setGameState((prev) => {
          if (prev.timeLeft <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;

            onTimeUp();
            return {
              ...prev,
              timeLeft: 0,
              isPlaying: false,
              hasTimeUp: true,
            };
          }

          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
          };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, freeze, setGameState, onTimeUp, hideTimer]);

  // Replace the SVG-based timer with a responsive pill-shaped design
  return (
    <div className={`absolute top-0 left-1/2 -translate-x-1/2  w-fit flex flex-col items-center gap-2`}>
      {gameName && (
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] sm:tracking-[2px] font-bold text-black uppercase luckiest-guy-regular drop-shadow-md">
          {gameName}
        </div>
      )}
      {!hideTimer && (
        <div className="do-no-capture flex gap-6 font-bold items-center justify-center">
          <div className="flex items-center">
            <TimerSvg />

            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
