import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";

export default function SettingsBar({
  onSettingsClick,
}: {
  onSettingsClick: () => void;
}) {
  return (
    <div className="absolute top-4 right-4 flex gap-4">
      <button
        className="flex items-center gap-1 bg-black p-2 rounded-md hover:bg-white hover:text-black transition ease-in-out"
        onClick={onSettingsClick}
      >
        <span>Settings</span> <IoMdSettings className="inline" />
      </button>
      <button className="flex items-center gap-1 bg-black p-2 rounded-md hover:bg-white hover:text-black transition ease-in-out">
        <span>About</span> <IoMdInformationCircleOutline className="inline" />
      </button>
    </div>
  );
}
