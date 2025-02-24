import { useTaskListStore } from "@/app/_store";
import { Task } from "@/app/_types";
import {
  Accordion,
  AccordionItem,
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
      className="bg-gray-900/50 h-5/6"
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Tasks</ModalHeader>
        <Divider className="bg-gray-500" />
        <div className="flex flex-col h-5/6 overflow-hidden m-3 mt-6">
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
          <div className={`flex-1 mt-2 w-full overflow-auto`}>
            <Accordion
              selectionMode="multiple"
              defaultExpandedKeys={["1", "2"]}
            >
              <AccordionItem key={"1"} title="Tasks in progress">
                {currentTasks.length === 0 && (
                  <h1 className="text-center mb-2">No tasks in progress</h1>
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
              </AccordionItem>
              <AccordionItem key={"2"} title="Tasks done">
                {doneTasks.length === 0 && (
                  <h1 className="text-center">No tasks completed</h1>
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
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
