import { useTaskListStore } from "@/app/_store";
import { Task } from "@/app/_types";
import {
  Divider,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import SortableList from "../sortable-tasklist/sortable-list";

type TaskListModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function TaskListModal({
  isOpen,
  handleClose,
}: TaskListModalProps) {
  const [taskList, addTask, removeTask, toggleTaskProgress, reorderTasks] =
    useTaskListStore((state) => [
      state.tasks,
      state.addTask,
      state.removeTask,
      state.toggleTaskProgress,
      state.reorderTasks,
    ]);

  const [currentTasks, setCurrentTasks] = useState(
    taskList.filter((task) => !task.done)
  );
  const [doneTasks, setDoneTasks] = useState(
    taskList.filter((task) => task.done)
  );
  const [newTaskForm, setNewTaskForm] = useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const submitNewTask = () => {
    if (!newTaskForm) return;

    addTask(newTaskForm);
    setNewTaskForm("");
    inputRef.current?.focus();
  };

  const handleChangeCurrentTasks = (newCurrentTasks: Task[]) => {
    reorderTasks(newCurrentTasks, doneTasks);
  };

  const handleChangeDoneTasks = (newDoneTasks: Task[]) => {
    reorderTasks(currentTasks, newDoneTasks);
  };

  useEffect(() => {
    const newCurrentTasks = taskList.filter((task) => !task.done);
    const newDoneTasks = taskList.filter((task) => task.done);

    setCurrentTasks(newCurrentTasks);
    setDoneTasks(newDoneTasks);
  }, [taskList]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="bg-black/50 h-3/4"
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Tasks</ModalHeader>
        <Divider className="bg-gray-500" />
        <ModalHeader>Add task</ModalHeader>
        <div className="flex flex-col h-3/4 overflow-hidden m-3 mt-0">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitNewTask();
            }}
          >
            <Input
              placeholder="Add a new task"
              onChange={(e) => {
                setNewTaskForm(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitNewTask();
                }
              }}
              value={newTaskForm}
              ref={inputRef}
            />
            <button
              type="submit"
              className="bg-white text-black w-24 py-2 rounded-3xl transition ease-in-out"
            >
              Add
            </button>
          </form>
          <div
            className={`flex-1 my-4 w-full overflow-auto rounded-3xl bg-default-100/50 px-4`}
          >
            {currentTasks.length === 0 && doneTasks.length === 0 && (
              <h1 className="text-center mt-2">No tasks to display!</h1>
            )}
            {currentTasks.length > 0 && (
              <SortableList
                items={currentTasks}
                onChange={handleChangeCurrentTasks}
                renderItem={(item) => (
                  <div className="flex">
                    <SortableList.Item
                      id={item.id}
                      removeTask={removeTask}
                      changeTaskStatus={toggleTaskProgress}
                      isDone={false}
                    >
                      {item.task}
                    </SortableList.Item>
                  </div>
                )}
              />
            )}
            {doneTasks.length > 0 && (
              <SortableList
                items={doneTasks}
                onChange={handleChangeDoneTasks}
                renderItem={(item) => (
                  <div className="flex">
                    <SortableList.Item
                      id={item.id}
                      removeTask={removeTask}
                      changeTaskStatus={toggleTaskProgress}
                      isDone={true}
                    >
                      {item.task}
                    </SortableList.Item>
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
