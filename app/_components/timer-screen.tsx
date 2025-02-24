import { useDisclosure } from "@heroui/react";
import SettingsBar from "./settings-bar";
import Timer from "./timer/timer";
import SettingsModal from "./modal/settings-modal";
import TaskListModal from "./modal/tasklist-modal";

export default function TimerScreen() {
  const {
    isOpen: isOpenSettingsModal,
    onOpen: onOpenSettingsModal,
    onOpenChange: onOpenChangeSettingsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenTaskListModal,
    onOpen: onOpenTaskListModal,
    onOpenChange: onOpenChangeTaskListModal,
  } = useDisclosure();

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <SettingsBar
        onSettingsClick={onOpenSettingsModal}
        onTaskListClick={onOpenTaskListModal}
      />
      <Timer />
      <SettingsModal
        isOpen={isOpenSettingsModal}
        handleClose={onOpenChangeSettingsModal}
      />
      <TaskListModal
        isOpen={isOpenTaskListModal}
        handleClose={onOpenChangeTaskListModal}
      />
    </div>
  );
}
