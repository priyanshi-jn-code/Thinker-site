import { Image, Note, Twitter } from "../../icons/Twitter";
import { SideBarItem } from "./SideBarItem";
import { Youtube } from "../../icons/Youtube";
import { Logo } from "../../icons/Logo";
// import { useState } from "react";
// import { SideLine } from "../../icons/Cross";

interface SideBarProps {
  onTypeSelect: (type: string | null) => void;
}

export function SideBar({ onTypeSelect }: SideBarProps) {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      {/* <button onClick={toggleSidebar} className="sm:hidden fixed top-4 ml-3 bg-green-600 text-white p-2 rounded-md shadow-md">
        {isOpen ? "" : <SideLine />}
      </button>    ${isOpen ? "left-0" : "-left-full"} */}
      <div
        className={`bg-neonbg bg-cover h-screen fixed top-0      sm:left-0 w-32 sm:w-56 sm:fixed transition-all duration-200`}
      >
        <div className="font-bolder flex justify-start gap-1 items-center pl-1 mt-2">
          <Logo />
          <div className="font-bold text-lg text-green-500 mr-2">THINKER</div>
        </div>
        <div>
          <SideBarItem text="Twitter" icon={<Twitter />} onClick={() => onTypeSelect("twitter")} />
          <SideBarItem text="Text" icon={<Note />} onClick={() => onTypeSelect("text")} />
          <SideBarItem text="Youtube" icon={<Youtube />} onClick={() => onTypeSelect("youtube")} />
          <SideBarItem text="Image" icon={<Image />} onClick={() => onTypeSelect("image")} />

        </div>
      </div>

      {/* {isOpen && <div onClick={toggleSidebar} className="sm:hidden fixed inset-0"></div>} */}
    </>
  );
}
