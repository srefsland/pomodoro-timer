import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";

export default function SettingsBar({
  onSettingsClick,
}: {
  onSettingsClick: () => void;
}) {
  return (
    <div className="absolute top-4 right-4 flex gap-4">
      <button
        className="flex items-center gap-1 border-white border-1 p-2 rounded-3xl transition ease-in-out hover:bg-white hover:text-black"
        onClick={onSettingsClick}
      >
        <span>Settings</span> <IoMdSettings className="inline" />
      </button>
      <button className="flex items-center gap-1 border-white border-1 p-2 rounded-3xl transition ease-in-out hover:bg-white hover:text-black">
        <span>Info</span> <IoMdInformationCircleOutline className="inline" />
      </button>
    </div>
  );
}
