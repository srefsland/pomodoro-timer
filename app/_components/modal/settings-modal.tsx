import { defaultTimerConfig } from "@/app/_config";
import {
  useSelectedTimerSoundStore,
  useTimerConfigStore,
  useTimerSoundsStore,
  useTimerVolumeStore,
} from "@/app/_store";
import { TimerConfig, TimerSound } from "@/app/_types";
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Slider,
  Switch,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

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
  const [timerVolume, setTimerVolume] = useTimerVolumeStore((state) => [
    state.audioVolume,
    state.setAudioVolume,
  ]);
  const [timerSound, setTimerSound] = useSelectedTimerSoundStore((state) => [
    state.timerSound,
    state.setTimerSound,
  ]);
  const timerSounds = useTimerSoundsStore((state) => state.sounds);

  const [timerConfigForm, setTimerConfigForm] =
    useState<TimerConfig>(timerConfig);
  const [timerVolumeForm, setTimerVolumeForm] = useState(timerVolume);
  const [timerSoundForm, setTimerSoundForm] = useState(timerSound);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimerConfig(timerConfigForm);
    setTimerVolume(timerVolumeForm);
    setTimerSound(timerSoundForm);
    handleClose();
  };

  const resetToDefault = () => {
    setTimerConfigForm(defaultTimerConfig);
    setTimerSoundForm(timerSounds[0]);
    setTimerVolumeForm(50);
  };

  const playSound = (sound: TimerSound) => {
    if (audioRef.current) {
      audioRef.current.src = sound.file;
      audioRef.current.volume = timerVolumeForm / 100;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    setTimerConfigForm(timerConfig);
    setTimerVolumeForm(timerVolume);
    setTimerSoundForm(timerSound);
  }, [timerVolume, timerConfig, timerSound, isOpen]);

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="bg-black/50"
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <form onSubmit={handleSettingsSubmit}>
          <ModalBody>
            <Divider className="bg-gray-500" />
            <ModalHeader>Timer Settings</ModalHeader>
            <Slider
              size="sm"
              label="Focus Time"
              className="light"
              step={1}
              maxValue={90}
              minValue={1}
              value={timerConfigForm.workMinutes}
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
              className="light"
              step={1}
              maxValue={90}
              minValue={1}
              value={timerConfigForm.shortBreakMinutes}
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
              className="light"
              step={1}
              maxValue={90}
              minValue={1}
              value={timerConfigForm.longBreakMinutes}
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
              className="light"
              step={1}
              maxValue={12}
              minValue={1}
              value={timerConfigForm.numberOfRounds}
              onChange={(e) =>
                setTimerConfigForm({
                  ...timerConfigForm,
                  numberOfRounds: e as number,
                })
              }
            />
            <Switch
              size="sm"
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
              size="sm"
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
            <Divider className="bg-gray-500" />
            <ModalHeader>Audio Settings</ModalHeader>
            <Select
              size="sm"
              className="mb-4"
              disallowEmptySelection
              defaultSelectedKeys={[timerSoundForm.name]}
              aria-label="Select a sound for the timer"
            >
              {timerSounds.map((sound) => (
                <SelectItem
                  key={sound.name}
                  value={sound.name}
                  onClick={() => {
                    setTimerSoundForm(sound);
                    playSound(sound);
                  }}
                >
                  {sound.label}
                </SelectItem>
              ))}
            </Select>
            <Slider
              size="sm"
              label="Timer Volume"
              className="light"
              step={1}
              maxValue={100}
              minValue={0}
              value={timerVolumeForm}
              onChange={(e) => setTimerVolumeForm(e as number)}
            />
          </ModalBody>
          <ModalFooter className="flex justify-between mb-4">
            <button
              type="button"
              className="bg-white text-black w-36 p-2 rounded-3xl transition ease-in-out"
              onClick={resetToDefault}
            >
              Default settings
            </button>
            <button
              type="submit"
              className="bg-white text-black w-24 py-2 rounded-3xl transition ease-in-out"
            >
              Save
            </button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
