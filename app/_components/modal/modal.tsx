"use client";

import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal(props: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open close
  useEffect(() => {
    if (props.isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [props.isOpen]);

  // If clicked outside bounding rect, close
  const handlePointerDown = (e: React.PointerEvent<HTMLDialogElement>) => {
    const boundingBox = dialogRef.current?.getBoundingClientRect();
    if (!boundingBox) return;

    if (
      e.clientX < boundingBox?.left ||
      e.clientX > boundingBox?.right ||
      e.clientY < boundingBox?.top ||
      e.clientY > boundingBox?.bottom
    ) {
      props.onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onPointerDown={handlePointerDown}
      className={`backdrop:bg-black backdrop:opacity-40 bg-transparent rounded-md`}
    >
      <div
        className="absolute top-2 right-2 hover:bg-gray-200/25 rounded-md"
        onClick={props.onClose}
      >
        <IoMdClose className="size-5 text-gray-400" />
      </div>
      {props.children}
    </dialog>
  );
}
