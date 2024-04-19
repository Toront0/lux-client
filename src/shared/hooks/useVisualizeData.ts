import { useToggleTheme } from "@/stores/darkTheme/darkTheme";
import { useRef, useCallback } from "react";

let animationController;

export const useVisualizeMusic = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const source = useRef<MediaElementAudioSourceNode>();
  const analyzer = useRef<AnalyserNode>();
  const audioRef = useRef<HTMLAudioElement>();

  const theme = useToggleTheme();

  const handleAudioPlay = () => {
    const audioContext = new AudioContext();
    if (!source.current && audioRef.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current);
      analyzer.current = audioContext.createAnalyser();
      source.current.connect(analyzer.current);
      analyzer.current.connect(audioContext.destination);
    }
    visualizeData();
  };

  const visualizeData = useCallback(() => {
    animationController = window.requestAnimationFrame(visualizeData);
    if (audioRef.current?.paused) {
      return cancelAnimationFrame(animationController);
    }

    const songData = new Uint8Array(140);

    analyzer.current?.getByteFrequencyData(songData);

    if (!canvasRef.current) {
      return;
    }

    if (!audioRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;

    if (!ctx) return;

    ctx.fillStyle = theme.activeTheme === "light" ? "#fff" : "#0e0e10";
    ctx.fillRect(0, 0, window.innerWidth, 100);

    ctx.imageSmoothingEnabled = false;

    let start;

    const barcolor = theme.activeTheme === "light" ? "#fb7185" : "#9f1239";

    for (let i = 0; i < songData.length; i++) {
      start = i * 4;

      ctx.fillStyle = barcolor;
      ctx.strokeStyle = barcolor;
      ctx.beginPath();

      ctx?.roundRect(
        start,
        canvasRef.current?.height || 0,
        3,
        -songData[i] * 0.25,
        [100, 100, 30, 30]
      );
      ctx.fill();
      ctx.stroke();
    }
  }, []);

  return { audioRef, canvasRef, handleAudioPlay };
};
