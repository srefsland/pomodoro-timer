import { Slider, Switch } from "@nextui-org/react";
import { useState } from "react";
import Modal from "./modal";

type SettingsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (timerConfig: TimerConfig) => void;
  initialTimerConfig: TimerConfig;
};

export default function SettingsModal({
  isOpen,
  handleClose,
  handleSubmit,
  initialTimerConfig,
}: SettingsModalProps) {
  const [workMinutes, setWorkMinutes] = useState(
    initialTimerConfig.workMinutes
  );
  const [shortBreakMinutes, setShortBreakMinutes] = useState(
    initialTimerConfig.shortBreakMinutes
  );
  const [longBreakMinutes, setLongBreakMinutes] = useState(
    initialTimerConfig.longBreakMinutes
  );
  const [numberOfRounds, setNumberOfRounds] = useState(
    initialTimerConfig.numberOfRounds
  );
  const [autoStartWork, setAutoStartWork] = useState(
    initialTimerConfig.autoStartWork
  );
  const [autoStartBreak, setAutoStartBreak] = useState(
    initialTimerConfig.autoStartBreak
  );

  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timerConfig: TimerConfig = {
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      numberOfRounds,
      autoStartWork,
      autoStartBreak,
    };
    handleSubmit(timerConfig);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div
        className={
          "flex flex-col items-center bg-indigo-950/75 py-10 px-5 w-full md:w-max md:m-auto"
        }
      >
        <h1 className={"text-3xl font-bold text-white text-center mb-6"}>
          Settings
        </h1>
        <form onSubmit={handleSettingsSubmit}>
          <Slider
            size="sm"
            label="Focus Time"
            step={1}
            maxValue={90}
            minValue={1}
            defaultValue={initialTimerConfig.workMinutes}
            className="max-w-md text-white"
            onChange={(e) => setWorkMinutes(e as number)}
          />
          <Slider
            size="sm"
            label="Short Break Time"
            step={1}
            maxValue={90}
            minValue={1}
            defaultValue={initialTimerConfig.shortBreakMinutes}
            className="max-w-md text-white"
            onChange={(e) => setShortBreakMinutes(e as number)}
          />
          <Slider
            size="sm"
            label="Long Break Time"
            step={1}
            maxValue={90}
            minValue={1}
            defaultValue={initialTimerConfig.longBreakMinutes}
            className="max-w-md text-white"
            onChange={(e) => setLongBreakMinutes(e as number)}
          />
          <Slider
            size="sm"
            label="Number of Rounds"
            step={1}
            maxValue={12}
            minValue={1}
            defaultValue={initialTimerConfig.numberOfRounds}
            className="max-w-md text-white mb-2"
            onChange={(e) => setNumberOfRounds(e as number)}
          />
          <Switch
            defaultSelected
            size="sm"
            className="mb-4 mr-4"
            defaultChecked={initialTimerConfig.autoStartWork}
            onChange={(e) => setAutoStartWork(e.target.checked)}
          >
            <h1 className="text-white">Auto-Start Work Timer</h1>
          </Switch>
          <Switch
            defaultSelected
            size="sm"
            className="mb-6"
            defaultChecked={initialTimerConfig.autoStartBreak}
            onChange={(e) => setAutoStartBreak(e.target.checked)}
          >
            <h1 className="text-white">Auto-Start Break Timer</h1>
          </Switch>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-black/85 p-2 rounded-md hover:bg-black/60 transition ease-in-out text-white"
            >
              Save
            </button>
            <button
              className="bg-black/85 p-2 rounded-md hover:bg-black/60 transition ease-in-out text-white"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
