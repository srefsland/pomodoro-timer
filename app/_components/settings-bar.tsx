"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IoMdSettings } from "react-icons/io";
import { IoImagesOutline, IoList } from "react-icons/io5";
import { useBackgroundImageStore, useBackgroundImagesStore } from "../_store";

export default function SettingsBar({
  onSettingsClick,
  onTaskListClick,
}: {
  onSettingsClick: () => void;
  onTaskListClick: () => void;
}) {
  const backgroundImages = useBackgroundImagesStore(
    (state) => state.backgroundImages
  );
  const setSelectedBackground = useBackgroundImageStore(
    (state) => state.setBackgroundImage
  );

  return (
    <div className="absolute top-4 right-4 flex gap-4">
      <button
        className="flex items-center gap-1 border-white border-1 p-2 rounded-3xl transition ease-in-out hover:bg-white hover:text-black"
        onClick={onSettingsClick}
      >
        <span>Settings</span> <IoMdSettings />
      </button>
      <button
        className="flex items-center gap-1 border-white border-1 p-2 rounded-3xl transition ease-in-out hover:bg-white hover:text-black"
        onClick={onTaskListClick}
      >
        <span>Task List</span> <IoList />
      </button>
      <Dropdown className="bg-gray-900/50">
        <DropdownTrigger>
          <button className="flex items-center gap-1 border-white border-1 p-2 rounded-3xl transition ease-in-out hover:bg-white hover:text-black">
            <span>Select Background</span> <IoImagesOutline className="mr-1" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Select different backgrounds">
          {backgroundImages.map((image) => (
            <DropdownItem
              key={image}
              onClick={() => {
                setSelectedBackground(image);
              }}
            >
              {image}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
