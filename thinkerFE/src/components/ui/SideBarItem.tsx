import { ReactElement } from "react";

interface SideBarProps {
  text: string;
  icon: ReactElement;
  onClick: () => void;
}

export function SideBarItem({ text, icon, onClick }: SideBarProps) {
  return (
    <div
      className="flex items-center gap-1 ml-2 mt-2 sm:mt-4 cursor-pointer rounded-lg px-2 sm:ml-6 text-green-300 hover:text-green-800 hover:bg-green-300"
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="text-sm font-medium sm:text-base md:text-lg">{text}</div>
    </div>
  );
}
