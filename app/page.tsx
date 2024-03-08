import Timer from "./_components/timer";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Timer
        workTime={25}
        breakTime={5}
        longBreakTime={15}
        numberOfRounds={4}
        autoStartWork={true}
        autoStartBreak={true}
      />
    </div>
  );
}
