"use client";

import { useDisclosure } from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
import { IoLogoGithub } from "react-icons/io5";
import SettingsModal from "./_components/modal/settings-modal";
import SettingsBar from "./_components/settings-bar";
import Timer from "./_components/timer/timer";
import { useBackgroundImageStore, useHydrateStore } from "./_store";
import darkForest from "/public/img/darkforest.png";
import mountainousSunset from "/public/img/mountainsunset.jpg";

const REPO_URL = "https://github.com/simenrefsland/pomodoro-timer";
const imageImports: { [key: string]: StaticImageData } = {
  "Dark Forest": darkForest,
  "Mountainous Sunset": mountainousSunset,
};

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const backgroundImage = useBackgroundImageStore(
    (state) => state.backgroundImage
  );
  const hasHydrated = useHydrateStore((state) => state._hasHydrated);

  return (
    <>
      <div className="relative h-screen w-full flex items-center justify-center">
        <SettingsBar onSettingsClick={onOpen} />
        {hasHydrated && (
          <Image
            src={imageImports[backgroundImage] || darkForest}
            alt="forest"
            fill
            sizes="100vw"
            placeholder="blur"
            className="-z-10 object-cover"
          />
        )}
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
