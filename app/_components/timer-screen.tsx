import { useDisclosure } from "@nextui-org/react";
import SettingsBar from "./settings-bar";
import Timer from "./timer/timer";
import SettingsModal from "./modal/settings-modal";

export default function TimerScreen() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <SettingsBar onSettingsClick={onOpen} />
      <Timer />
      <SettingsModal isOpen={isOpen} handleClose={onOpenChange} />
    </div>
  );
}
