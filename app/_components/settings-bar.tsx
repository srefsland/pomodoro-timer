import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";

export default function SettingsBar({
  onSettingsClick,
}: {
  onSettingsClick: () => void;
}) {
  return (
    <div className="absolute top-4 right-4 flex gap-4">
      <button
        className="bg-indigo-950/75 p-2 rounded-md hover:bg-indigo-950/60 transition ease-in-out"
        onClick={onSettingsClick}
      >
        Settings <IoMdSettings className="inline" />
      </button>
      <button className="bg-indigo-950/75 p-2 rounded-md hover:bg-indigo-950/60">
        About <IoMdInformationCircleOutline className="inline" />
      </button>
    </div>
  );
}
