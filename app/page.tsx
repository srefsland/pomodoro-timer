"use client";

import Image from "next/image";
import { useState } from "react";
import lofi from "../public/lofi.png";
import SettingsModal from "./_components/modal/settings-modal";
import SettingsBar from "./_components/settings-bar";
import Timer from "./_components/timer/timer";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [timerConfig, setTimerConfig] = useState<TimerConfig>({
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    numberOfRounds: 4,
    autoStartBreak: true,
    autoStartWork: true,
  });

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsSubmit = (timerConfig: TimerConfig) => {
    setTimerConfig(timerConfig);
    setIsSettingsOpen(false);
  };

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <SettingsBar onSettingsClick={handleSettingsClick} />
        <Image
          src={lofi}
          alt="lofi"
          fill
          sizes="100vw"
          placeholder="blur"
          className="-z-10 object-cover"
        />
        <div className="bg-red-300/25 p-6 rounded-md relative">
          <Timer timerConfig={timerConfig} />
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        handleClose={() => setIsSettingsOpen(false)}
        handleSubmit={handleSettingsSubmit}
        initialTimerConfig={timerConfig}
      />
    </>
  );
}
