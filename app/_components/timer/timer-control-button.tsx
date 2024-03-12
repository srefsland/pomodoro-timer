"use client";

type TimerControlButtonProps = {
  label: string;
  onClick: () => void;
};

export default function TimerControlButton(props: TimerControlButtonProps) {
  return (
    <button
      className="bg-black/85 hover:bg-white/85 hover:text-black text-white transition ease-in-out
       font-bold h-10 w-16 rounded"
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
