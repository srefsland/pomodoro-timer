"use client";

import Image, { StaticImageData } from "next/image";
import { IoLogoGithub } from "react-icons/io";
import InfoScreen from "@/app/_components/info-screen";
import TimerScreen from "@/app/_components/timer-screen";
import { useBackgroundImageStore, useHydrateStore } from "../store";
import darkForest from "/public/img/darkforest.png";
import mountainousSunset from "/public/img/mountainsunset.jpg";
import rainstormSummit from "/public/img/rainstormsummit.jpg";
import { authClient } from "@/lib/auth-client";

const imageImports: { [key: string]: StaticImageData } = {
  "Dark Forest": darkForest,
  "Mountainous Sunset": mountainousSunset,
  "Rainstorm Beneath the Summit": rainstormSummit,
};

const REPO_URL = "https://github.com/srefsland/pomodoro-timer";

export default function Home() {
  const backgroundImage = useBackgroundImageStore(
    (state) => state.backgroundImage
  );
  const hasHydrated = useHydrateStore((state) => state._hasHydrated);
  const { isPending } = authClient.useSession();

  if (!hasHydrated || isPending) {
    return null;
  }

  return (
    <>
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-screen">
        <div className="absolute w-full h-full">
          {hasHydrated && (
            <Image
              src={imageImports[backgroundImage] || darkForest}
              alt="forest"
              fill
              sizes="100vw"
              placeholder="blur"
              className="-z-10 object-cover"
              data-testid="background-image"
            />
          )}
        </div>
        <div className="snap-start">
          <TimerScreen />
        </div>
        <div className="snap-start">
          <InfoScreen />
        </div>
        <a
          href={REPO_URL}
          target="_blank"
          className="fixed bottom-4 right-4 text-white p-2 transition ease-in-out"
        >
          <IoLogoGithub className="inline size-6" />
        </a>
      </div>
    </>
  );
}
