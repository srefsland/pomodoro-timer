import { useTimerConfigStore } from "@/app/_store";
import { TimerConfig } from "@/app/_types";
import { Slider, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Modal from "./modal";

type SettingsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function SettingsModal({
  isOpen,
  handleClose,
}: SettingsModalProps) {
  const [timerConfig, setTimerConfig, hasHydrated] = useTimerConfigStore(
    (state) => [state.timerConfig, state.setTimerConfig, state._hasRehydrated]
  );

  const [timerSettings, setTimerSettings] = useState<TimerConfig>(timerConfig);

  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timerConfig: TimerConfig = timerSettings;
    setTimerConfig(timerConfig);
    handleClose();
  };

  useEffect(() => {
    // Updates the settings if there is a peristed timer config
    if (hasHydrated) {
      setTimerSettings(timerConfig);
    }
  }, [hasHydrated, timerConfig]);

  // If the store has not hydrated, wait for it to hydrate to prevent default values from being set
  if (!hasHydrated) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div
        className={
          "flex flex-col items-center bg-indigo-950/85 py-8 px-5 md:w-3/4 mx-auto transition ease-in-out rounded-md"
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
            defaultValue={timerConfig.workMinutes}
            className="max-w-md text-white"
            onChange={(e) =>
              setTimerSettings({ ...timerSettings, workMinutes: e as number })
            }
          />
          <Slider
            size="sm"
            label="Short Break Time"
            step={1}
            maxValue={90}
            minValue={1}
            defaultValue={timerConfig.shortBreakMinutes}
            className="max-w-md text-white"
            onChange={(e) =>
              setTimerSettings({
                ...timerSettings,
                shortBreakMinutes: e as number,
              })
            }
          />
          <Slider
            size="sm"
            label="Long Break Time"
            step={1}
            maxValue={90}
            minValue={1}
            defaultValue={timerConfig.longBreakMinutes}
            className="max-w-md text-white"
            onChange={(e) =>
              setTimerSettings({
                ...timerSettings,
                longBreakMinutes: e as number,
              })
            }
          />
          <Slider
            size="sm"
            label="Number of Rounds"
            step={1}
            maxValue={12}
            minValue={1}
            defaultValue={timerConfig.numberOfRounds}
            className="max-w-md text-white mb-2"
            onChange={(e) =>
              setTimerSettings({
                ...timerSettings,
                numberOfRounds: e as number,
              })
            }
          />
          <Switch
            defaultSelected
            size="sm"
            className="mb-4 mr-4"
            defaultChecked={timerConfig.autoStartWork}
            onChange={(e) =>
              setTimerSettings({
                ...timerSettings,
                autoStartWork: e.target.checked,
              })
            }
          >
            <h1 className="text-white">Auto-Start Work Timer</h1>
          </Switch>
          <Switch
            defaultSelected
            size="sm"
            className="mb-6"
            defaultChecked={timerConfig.autoStartBreak}
            onChange={(e) =>
              setTimerSettings({
                ...timerSettings,
                autoStartBreak: e.target.checked,
              })
            }
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
