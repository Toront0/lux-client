import { useRef, useEffect, useCallback } from "react";

let animationController;

import song from "/2Pac.mp3";
import { useToggleTheme } from "@/stores/darkTheme/darkTheme";

const MusicCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const source = useRef<MediaElementAudioSourceNode>();
  const analyzer = useRef<AnalyserNode>();
  const audioRef = useRef<HTMLAudioElement>();

  const theme = useToggleTheme();

  console.log("theme", theme);

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

    ctx.fillStyle = theme.activeTheme === "light" ? "#fff" : "#000";
    ctx.fillRect(0, 0, window.innerWidth, 100);

    ctx.imageSmoothingEnabled = false;

    let start;

    for (let i = 0; i < songData.length; i++) {
      start = i * 8;
      const gradient = ctx.createLinearGradient(0, 0, 0, 136);

      // Add three color stops
      gradient.addColorStop(0, "white");
      gradient.addColorStop(0.25, "red");
      gradient.addColorStop(0.45, "yellow");

      gradient.addColorStop(1, "purple");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = gradient;
      ctx.beginPath();

      ctx?.roundRect(
        start,
        canvasRef.current?.height || 0,
        6,
        -songData[i] * 0.5,
        [100, 100, 30, 30]
      );
      ctx.fill();
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = 0.1;
  }, [audioRef.current]);

  return (
    <div className="w-full top-1/2 -translate-y-1/2 h-full absolute">
      <button
        onClick={() => {
          if (audioRef.current?.paused) {
            audioRef.current.play();
          } else {
            audioRef.current?.pause();
          }
        }}
        className="absolute bottom-full mb-20 px-2 py-1 "
      >
        Play
      </button>
      <canvas
        ref={canvasRef as React.RefObject<HTMLCanvasElement>}
        className="w-full h-full "
        id="preview"
        height="104"
      />
      <audio
        ref={audioRef as React.RefObject<HTMLAudioElement>}
        src={song}
        autoPlay
        onPlay={handleAudioPlay}
      ></audio>
    </div>
  );
};

export default MusicCanvas;
