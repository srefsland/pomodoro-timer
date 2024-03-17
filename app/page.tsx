"use client";

import Image from "next/image";
import { useState } from "react";
import { IoLogoGithub } from "react-icons/io5";
import lofi from "../public/lofi.png";
import SettingsModal from "./_components/modal/settings-modal";
import SettingsBar from "./_components/settings-bar";
import Timer from "./_components/timer/timer";
import { useDisclosure } from "@nextui-org/react";

const REPO_URL = "https://github.com/simenrefsland/pomodoro-timer";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="relative h-screen w-full flex items-center justify-center">
        <SettingsBar onSettingsClick={onOpen} />
        <Image
          src={lofi}
          alt="lofi"
          fill
          sizes="100vw"
          placeholder="blur"
          className="-z-10 object-cover"
        />
        <div className="bg-red-300/25 p-6 rounded-md relative">
          <Timer />
        </div>
        <a
          href={REPO_URL}
          target="_blank"
          className="fixed bottom-4 right-4 bg-black/85 hover:bg-white/85 hover:text-black text-white p-2 rounded-md transition ease-in-out"
        >
          <IoLogoGithub className="inline size-6" />
        </a>
      </div>
      <SettingsModal isOpen={isOpen} handleClose={onOpenChange} />
    </>
  );
}
