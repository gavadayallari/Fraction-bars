import OrientationGuard from "./components/common/OrientationGuard";
import GamePreview from "./pages/GamePreview";
import { useCallback, useEffect, useState } from "react";
import type { GameConfigType } from "./types/TGames";
import defaultConfig from "./config/defaultConfig.json";

export type RefType = {
  triggerSave: () => Promise<GameConfigType | null>;
  triggerSaveAsDraft: () => Promise<GameConfigType | null>;
  captureScreenShot?: () => Promise<string | undefined>;
};

function App() {
  const [config] = useState<GameConfigType>(defaultConfig as GameConfigType);
  const gameID = "demo-preview";

  // Force re-render or layout check on orientation change to fix 100vh bugs
  useEffect(() => {
    const handleResize = () => {
      // Small trick to force mobile browsers to recalculate vh
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Initial call
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const sendDataToParent = useCallback(
    (status: {
      currentLevel: number;
      score: number | null;
      timePlayed: number;
      gameEnded: boolean;
      totalLevels: number;
      isLastLevel: boolean;
    }) => {
      try {
        (window as any)?.flutter_inappwebview?.callHandler(
          "gameStatus",
          status
        );
      } catch (error) {
        console.error("Failed to send data to Flutter", error);
      }
    },
    []
  );

  return (
    <>
      <OrientationGuard />
      <GamePreview
        gameId={gameID}
        config={config}
        sendDataToParent={sendDataToParent}
      />
    </>
  );
}

export default App;
