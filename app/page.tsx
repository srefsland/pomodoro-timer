"use client";

import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { IoLogoGithub } from "react-icons/io5";
import SettingsModal from "./_components/modal/settings-modal";
import SettingsBar from "./_components/settings-bar";
import Timer from "./_components/timer/timer";
import forest from "/public/forest.png";

const REPO_URL = "https://github.com/simenrefsland/pomodoro-timer";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="relative h-screen w-full flex items-center justify-center">
        <SettingsBar onSettingsClick={onOpen} />
        <Image
          src={forest}
          alt="forest"
          fill
          sizes="100vw"
          placeholder="blur"
          className="-z-10 object-cover"
        />
        <Timer />
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
