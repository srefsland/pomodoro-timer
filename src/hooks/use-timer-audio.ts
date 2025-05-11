import { useEffect, useRef } from "react";
import {
  useSelectedTimerSoundStore,
  useTimerVolumeStore,
  useHydrateStore,
} from "@/store";

export const useTimerAudio = () => {
  const hydrated = useHydrateStore((state) => state._hasHydrated);
  const timerSound = useSelectedTimerSoundStore((state) => state.timerSound);
  const audioVolume = useTimerVolumeStore((state) => state.audioVolume);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!hydrated || !timerSound?.file) return;

    const audio = new Audio(timerSound.file);
    audio.crossOrigin = "anonymous";
    audio.volume = audioVolume / 100;
    audioRef.current = audio;

    return () => {
      audioRef.current = null;
    };
  }, [hydrated, timerSound?.file]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume / 100;
    }
  }, [audioVolume]);

  const playTimerAudio = async () => {
    if (!hydrated) return;
    try {
      await audioRef.current?.play();
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  return { playTimerAudio };
};
