import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Spinner size="lg" color="default" label="Loading timer..." />
    </div>
  );
}
