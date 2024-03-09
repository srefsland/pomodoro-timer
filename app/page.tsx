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
    <div className="h-screen w-full flex items-center justify-center">
      <Timer timerConfig={timerConfig} />
    </div>
  );
}
