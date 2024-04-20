export default function InfoScreen() {
  return (
    <div className="relative min-h-screen bg-gray-900/65">
      <div className="flex flex-col justify-start pt-12 mx-auto w-3/4 md:w-5/12">
        <h1 className="text-white text-3xl font-bold">
          A simple and intuitive Pomodoro Timer
        </h1>
        <h2 className="text-white text-2xl mt-4 font-semibold">
          What is a Pomodoro Timer?
        </h2>
        <p className="mt-4">
          A pomodoro timer is a technique that is used to improve productivity
          and time managment originally developed by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
            target="_blank"
            className="font-bold"
          >
            Fransesco Cirillo
          </a>{" "}
          in the 1980s. The word pomodoro is Italian for tomato, refers to the
          tomato-shaped kitchen timer that Cirillo used as a university student.
        </p>
        <p className="mt-4">
          The original method used 25 minute work intervals, separated by 5
          minute breaks, and eventually a longer break of 20-30 minutes after 4
          work intervals. The technique can however be adjusted to suit any
          work style.
        </p>
        <h2 className="text-white text-2xl mt-4 font-semibold">
          Using and configuring the timer
        </h2>
        <p className="mt-4">
          To use this timer, simply click the play button to start the timer.
          The timer will automatically switch between work and break intervals
          based on the settings you choose.
        </p>
        <p className="my-4">
          You can adjust the settings by clicking the settings icon in the top
          right corner of the screen. You can change the number of work minutes
          (default is 25), short break minutes (default is 5), long break
          minutes (default is 15), number of rounds (default is 4), as well as
          alarm sound and volume.
        </p>
      </div>
    </div>
  );
}
