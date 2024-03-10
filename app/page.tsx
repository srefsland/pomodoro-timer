import Image from "next/image";
import lofi from "../public/lofi.png";
import Timer from "./_components/timer";

export default function Home() {
  const timerConfig: TimerConfig = {
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    numberOfRounds: 4,
    autoStartBreak: true,
    autoStartWork: true,
  };

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <Image
          src={lofi}
          alt="lofi"
          fill
          sizes="100vw"
          placeholder="blur"
          className="-z-10 object-cover"
        />
        <div className="bg-red-300/25 p-10 rounded-md">
          <Timer timerConfig={timerConfig} />
        </div>
      </div>
    </>
  );
}
