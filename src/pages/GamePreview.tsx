import CountdownTimer from "@/components/Countdown";
import { forwardRef, useEffect, useRef, useState } from "react";
import PreviewSidebar from "@/components/PreviewSidebar";
import LandscapeButton from "@/components/common/LandscapeButton";
import { useMobileLandscapeScaler } from "@/hooks/useMobileLandscapeScaler";
import type { GameConfigType, GameStateType } from "@/types/TGames";
import Image from "@/components/ui/image";
import type { RefType } from "@/App";
import { resolveBackgroundCss, uploadedAssetURL } from "@/lib/utils";
import TapToStart from "@/components/TapToStart";
import HintGuide from "@/components/HintGuide";
import FractionBarsBoard from "@/components/fraction-bars/FractionBarsBoard";
import LeftFractionPanel from "@/components/fraction-bars/LeftFractionPanel";
import ControlPanel from "@/components/fraction-bars/ControlPanel";

const ROWS = [
  { denominator: 2, numerator: 1, color: "bg-[#2ECC71]" }, // Green
  { denominator: 4, numerator: 2, color: "bg-[#3498DB]" }, // Blue
  { denominator: 6, numerator: 3, color: "bg-[#E74C3C]" }, // Red
  { denominator: 8, numerator: 4, color: "bg-[#22D3EE]" }, // Cyan
  { denominator: 10, numerator: 5, color: "bg-[#9B59B6]" }, // Purple
];

const GamePreview = forwardRef<
  RefType,
  {
    gameId: string;
    config: GameConfigType;
    sendDataToParent?: (status: {
      currentLevel: number;
      score: number | null;
      timePlayed: number;
      gameEnded: boolean;
      totalLevels: number;
      isLastLevel: boolean;
    }) => void;
  }
>(({ gameId, config }, _ref) => {
  /* ---------------- SCALING HOOK ---------------- */
  // Must be called before any conditional returns
  const scaledStyle = useMobileLandscapeScaler();

  /* ---------------- GAME STATE ---------------- */
  const [gameState, setGameState] = useState<GameStateType>({
    isPlaying: false,
    isMuted: false,
    hasWon: false,
    hasTimeUp: false,
    timeLeft: 0,
    duration: config?.duration ?? 0,
    hasStarted: false,
  });

  /* ---------------- FRACTION STATE ---------------- */
  const [rows, setRows] = useState(ROWS);
  const [activeRowIndex, setActiveRowIndex] = useState(0);

  // Derived state for the active row to feed into sliders
  const activeRow = rows[activeRowIndex];
  const numerator = activeRow.numerator;
  const denominator = activeRow.denominator;

  /* ---------------- HANDLERS ---------------- */

  const handleNumeratorChange = (val: number | ((prev: number) => number)) => {
    const newValue = typeof val === "function" ? val(numerator) : val;
    // Constraint: Numerator cannot exceed current denominator
    const clampedValue = Math.min(newValue, denominator);

    setRows((prev) => {
      const newRows = [...prev];
      newRows[activeRowIndex] = { ...newRows[activeRowIndex], numerator: clampedValue };
      return newRows;
    });
  };

  const handleDenominatorChange = (val: number | ((prev: number) => number)) => {
    const newValue = typeof val === "function" ? val(denominator) : val;

    setRows((prev) => {
      const newRows = [...prev];
      // Constraint: If denominator drops below current numerator, clamp numerator down
      const currentNum = newRows[activeRowIndex].numerator;
      const newNum = Math.min(currentNum, newValue);

      newRows[activeRowIndex] = {
        ...newRows[activeRowIndex],
        denominator: newValue,
        numerator: newNum
      };
      return newRows;
    });
  };

  /* ---------------- UI STATE ---------------- */
  const [freezeTimer, setFreezeTimer] = useState(false);
  const [firstTap, setFirstTap] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const gameGridRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- AUDIO ---------------- */
  const backgroundMusicRef = useRef<HTMLAudioElement>(
    new Audio("media/background.mp3")
  );
  const instructionsAudioRef = useRef<HTMLAudioElement>(
    new Audio(
      config?.audio?.instructions?.src
        ? uploadedAssetURL({ gameId, src: config.audio.instructions.src })
        : "media/instructions.webm"
    )
  );

  useEffect(() => {
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.5; // Set volume to 50%
  }, []);

  useEffect(() => {
    const bgMusic = backgroundMusicRef.current;

    // Logic: Play if game has started and is not muted (even if paused)
    const shouldPlay = gameState.hasStarted && !gameState.isMuted;

    if (shouldPlay) {
      bgMusic.play().catch((e) => console.log("Audio play failed:", e));
    } else {
      bgMusic.pause();
    }

    return () => {
      // Cleanup
    };
  }, [gameState.hasStarted, gameState.isMuted]); // Removing isPlaying dependency


  // Ensure music stops when component unmounts
  useEffect(() => {
    return () => {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  }, []);


  /* ---------------- SPLASH ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => setShowSplashScreen(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  /* ---------------- FRACTION CORRECT ---------------- */


  /* ---------------- START ---------------- */
  const handleStartGame = () => {
    if (!gameState.isMuted) instructionsAudioRef.current.play();
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      hasStarted: true,
      timeLeft: config?.duration ?? 0,
    }));
  };

  /* ---------------- RESET ---------------- */
  const handleResetGame = () => {
    setFreezeTimer(false);
    setRows(ROWS);
    setActiveRowIndex(0);
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      hasWon: false,
      hasTimeUp: false,
      timeLeft: config?.duration ?? 0,
      hasStarted: true,
    }));
  };

  if (showSplashScreen) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image
          src="images/eklavya.png"
          alt="eklavya"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }



  return (
    <div
      ref={gameGridRef}
      className="game-root h-screen w-screen relative overflow-hidden"
      style={{
        backgroundImage: resolveBackgroundCss(config?.background, gameId),
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={scaledStyle} className="relative">
        {/* -------- FRACTION BARS UI -------- */}
        <div
          className="game-content-wrapper flex flex-col items-center gap-4 md:gap-7 mt-2 w-full max-w-7xl mx-auto px-2 md:px-4 z-10 relative h-full justify-start md:justify-center"
        >
          <div className="game-top-section flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-8 w-full">
            <div className="game-left-panel-wrapper">
              <LeftFractionPanel
                rows={rows}
                activeRowIndex={activeRowIndex}
                onSelect={(_num, _den, index) => {
                  if (!gameState.isPlaying) return;
                  setActiveRowIndex(index);
                }}
              />
            </div>


            <div className="game-board-wrapper w-full flex-1">
              <FractionBarsBoard
                numerator={numerator} // Backwards compat, useless now
                denominator={denominator} // Backwards compat, useless now
                disabled={!gameState.isPlaying}
                rows={rows}
              />
            </div>
          </div>

          <div className="game-control-panel-wrapper w-full">
            <ControlPanel
              numerator={numerator}
              denominator={denominator}
              setNumerator={handleNumeratorChange}
              setDenominator={handleDenominatorChange}
              disabled={!gameState.isPlaying}
            />
          </div>
        </div>

        {/* -------- OVERLAYS -------- */}
        <TapToStart
          firstTap={firstTap}
          setFirstTap={setFirstTap}
          handleStartGame={handleStartGame}
        />

        <CountdownTimer
          initialTime={0}
          onTimeUp={() => { }}
          gameState={gameState}
          setGameState={setGameState}
          gameName="FRACTION BARS"
          freeze={freezeTimer}
          hideTimer={true}
        />
      </div>

      <PreviewSidebar
        resetGame={handleResetGame}
        showRestartButton
        gameState={gameState}
        setGameState={setGameState}
        togglePause={() =>
          setGameState((p) => ({ ...p, isPlaying: !p.isPlaying }))
        }
        toggleMute={() =>
          setGameState((p) => ({ ...p, isMuted: !p.isMuted }))
        }
      />

      <HintGuide
        gameState={gameState}
        setGameState={setGameState}
        play={() => backgroundMusicRef.current.play()}
        hint=""
      />

      <LandscapeButton />
    </div>
  );
});

export default GamePreview;
