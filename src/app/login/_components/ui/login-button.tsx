"use client";

export type LoginButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function LoginButton({
  onClick = () => {},
  children,
}: LoginButtonProps & {
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      className="bg-slate-950 text-white px-4 py-2 rounded"
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}
