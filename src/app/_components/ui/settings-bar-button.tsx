"use client";

export type SettingsBarButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function SettingsBarButton({
  onClick = () => {},
  children,
}: SettingsBarButtonProps) {
  return (
    <button
      className="flex items-center gap-1 border-white border-1 p-2 rounded-3xl transition ease-in-out hover:bg-white hover:text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
