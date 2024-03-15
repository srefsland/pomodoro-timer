import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import { Slider } from "@nextui-org/react";
import React from "react";

export default function SettingsBar({
  onSettingsClick,
}: {
  onSettingsClick: () => void;
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <div className="absolute top-4 right-4 flex gap-4">
      <button
        className="flex items-center gap-1 bg-indigo-950/75 p-2 rounded-md hover:bg-indigo-950/60 transition ease-in-out"
        onClick={onSettingsClick}
      >
        <span>Settings</span> <IoMdSettings className="inline" />
      </button>
      <button className="flex items-center gap-1 bg-indigo-950/75 p-2 rounded-md hover:bg-indigo-950/60 transition ease-in-out">
        <span>About</span> <IoMdInformationCircleOutline className="inline" />
      </button>
    </div>
  );
}
