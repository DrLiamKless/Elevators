import { useState, useEffect } from "react";

const useAudio = (url : string) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => setIsPlaying(!isPlaying);

  useEffect(() => {
      isPlaying ? audio.play() : audio.pause();
    },
    [isPlaying]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  return {
    isPlaying, 
    toggleAudio
  };
};

export default useAudio;