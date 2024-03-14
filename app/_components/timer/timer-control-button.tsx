"use client";

type TimerControlButtonProps = {
  label: string;
  onClick: () => void;
};

export default function TimerControlButton(props: TimerControlButtonProps) {
  return (
    <button
      className="bg-black/85 hover:bg-white/85 hover:text-black text-white transition ease-in-out h-10 w-16 rounded md:h-12 md:w-18 md:text-lg"
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
