import { useTimerAudioStore, useTimerConfigStore } from "@/app/_store";
import { TimerConfig } from "@/app/_types";
import { Divider, Slider, Switch } from "@nextui-org/react";
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
  const [timerConfig, setTimerConfig] = useTimerConfigStore((state) => [
    state.timerConfig,
    state.setTimerConfig,
  ]);
  const [audioVolume, setAudioVolume] = useTimerAudioStore((state) => [
    state.audioVolume,
    state.setAudioVolume,
  ]);
  const [timerConfigForm, setTimerConfigForm] =
    useState<TimerConfig>(timerConfig);
  const [audioVolumeForm, setAudioVolumeForm] = useState(audioVolume);

  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimerConfig(timerConfigForm);
    setAudioVolume(audioVolumeForm);
    handleClose();
  };

  useEffect(() => {
    setTimerConfigForm(timerConfig);
    setAudioVolumeForm(audioVolume);
  }, [audioVolume, timerConfig, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div
        className={
          "flex flex-col items-center bg-indigo-950/85 py-8 px-5 transition ease-in-out rounded-md sm:max-w-72"
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
            value={timerConfigForm.workMinutes}
            className="max-w-md text-white"
            onChange={(e) =>
              setTimerConfigForm({
                ...timerConfigForm,
                workMinutes: e as number,
              })
            }
          />
          <Slider
            size="sm"
            label="Short Break Time"
            step={1}
            maxValue={90}
            minValue={1}
            value={timerConfigForm.shortBreakMinutes}
            className="max-w-md text-white"
            onChange={(e) =>
              setTimerConfigForm({
                ...timerConfigForm,
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
            value={timerConfigForm.longBreakMinutes}
            className="max-w-md text-white"
            onChange={(e) =>
              setTimerConfigForm({
                ...timerConfigForm,
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
            value={timerConfigForm.numberOfRounds}
            className="max-w-md text-white mb-2"
            onChange={(e) =>
              setTimerConfigForm({
                ...timerConfigForm,
                numberOfRounds: e as number,
              })
            }
          />
          <Switch
            defaultSelected
            size="sm"
            className="mb-4 mr-4"
            isSelected={timerConfigForm.autoStartWork}
            onChange={(e) =>
              setTimerConfigForm({
                ...timerConfigForm,
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
            isSelected={timerConfigForm.autoStartBreak}
            onChange={(e) =>
              setTimerConfigForm({
                ...timerConfigForm,
                autoStartBreak: e.target.checked,
              })
            }
          >
            <h1 className="text-white">Auto-Start Break Timer</h1>
          </Switch>
          <Divider className="mb-4 bg-gray-500" />
          <Slider
            size="sm"
            label="Timer Volume"
            step={1}
            maxValue={100}
            minValue={0}
            value={audioVolumeForm}
            className="max-w-md text-white mb-4"
            onChange={(e) => setAudioVolumeForm(e as number)}
          />
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-black/85 p-2 rounded-md hover:bg-black/60 transition ease-in-out text-white"
            >
              Save
            </button>
            <button
              type="button"
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
