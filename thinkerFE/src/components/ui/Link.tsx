import { useEffect, useRef, useState } from "react"; 
import { Cross } from "../../icons/Cross";
import { useContent } from "../../hooks/useContent";

export interface OpenlinkClose {
  linkopen: boolean | string;
  closelink: () => void | boolean | string; 
  newLinkValue?: string;
}

export default function LinkModel({ linkopen, closelink, newLinkValue }: OpenlinkClose) {
  const [copyText, setCopyText] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { refresh } = useContent();

  useEffect(() => {
    refresh();
    setCopyText(true);
  }, [linkopen]);   

  function copy() {
    const inputRefValue = inputRef.current?.value;
    //@ts-ignore
    navigator.clipboard.writeText(inputRefValue);
    setCopyText(false);
  }

  return (
    <div>
      {linkopen && (
        <div className="fixed inset-0 bg-neonbg bg-no-repeat bg-cover bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-green-700 w-[90%] max-w-sm text-green-100 border border-black rounded-lg h-auto p-4">
            {/* Close Button */}
            <div onClick={closelink} className="flex justify-end items-center cursor-pointer">
              <Cross varient="greenlight" />
            </div>

            {/* Link Input */}
            <div className="mt-4">
              <label htmlFor="InputLink" className="block font-bold text-sm mb-2">
                Link:
              </label>
              <input
                type="text"
                ref={inputRef}
                value={newLinkValue}
                readOnly
                className="w-full text-green-700 p-2 border rounded"
                id="InputLink"
              />
            </div>

            {/* Copy Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={copy}
                className="bg-white border hover:border-green-600 rounded px-4 py-2 font-bold text-green-700 transition duration-200"
              >
                {copyText ? "Copy Link" : "Copied"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
