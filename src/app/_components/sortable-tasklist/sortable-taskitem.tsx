"use client";

import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@heroui/react";
import type { CSSProperties, PropsWithChildren } from "react";
import { createContext, useMemo } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";

interface SortableTaskItemProps {
  id: UniqueIdentifier;
  removeTask: (id: UniqueIdentifier) => void;
  changeTaskStatus: (id: UniqueIdentifier) => void;
  isDone: boolean;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableTaskItem({
  children,
  id,
  removeTask,
  changeTaskStatus,
  isDone,
}: PropsWithChildren<SortableTaskItemProps>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const deleteItem = () => {
    removeTask(id);
  };

  const doneStyle = isDone ? "text-gray-500 line-through" : "";

  return (
    <SortableItemContext.Provider value={context}>
      <li
        className="list-none flex justify-between items-center px-2.5 py-3.5 mb-2 w-full rounded-3xl bg-default-100/50"
        ref={setNodeRef}
        style={style}
      >
        <Checkbox isSelected={isDone} onChange={() => changeTaskStatus(id)}>
          <h1 className={`text-lg ${doneStyle}`}>{children}</h1>
        </Checkbox>
        <div className="flex gap-2">
          <button className="hover:bg-white/10 rounded-3xl p-1">
            <IoCloseSharp className="size-5" onClick={deleteItem} />
          </button>
          <button {...attributes} {...listeners}>
            <RxDragHandleDots2 />
          </button>
        </div>
      </li>
    </SortableItemContext.Provider>
  );
}
