"use client";

type TimerControlButtonProps = {
  label: string;
  onClick: () => void;
};

export default function TimerControlButton(props: TimerControlButtonProps) {
  return (
    <button
      className="bg-black border-white border-2 hover:bg-white hover:text-black text-white
       font-bold py-2 px-4 rounded"
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
