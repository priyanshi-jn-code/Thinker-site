import { Cross } from "../../icons/Cross";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export interface OpenClose {
  open: boolean | string;
  close: () => void | boolean | string;
}

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Text = "text",
  Image = "image",
  Instagram = "instagram",
}

export function ContentModal({ open, close }: OpenClose) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setContentType] = useState("");

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
     ` ${BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Token: localStorage.getItem("token"),
        },
      }
    );
    close();
  }

  return (
    <>
      <div className="justify-center">
        {open && (
          <div>
           
            <div className="w-screen h-screen bg-neonbg bg-no-repeat bg-cover fixed top-0 left-0 opacity-50 z-40"></div>

            <div className="w-screen h-screen fixed flex justify-center items-center top-0 left-0 z-50">
              <div className="bg-green-50 rounded-lg shadow-lg p-4 w-[90%] max-w-md">
                <div className="flex justify-end">
                  <button onClick={close} className="text-green-500 hover:text-green-800">
                    <Cross varient="greendark" />
                  </button>
                </div>
                <div className="mt-4 "  >
                  <InputBox placeholder="Title" referance={titleRef} wdsize="w-96" />
                  <InputBox placeholder="Link / Text" referance={linkRef} wdsize="w-96"/>
                  <div className="mt-4 m-2 w-96 ">
                    <label className="block text-sm font-medium text-green-700 mb-1">
                      Content Type:
                    </label>
                    <select
                      className="p-2 border rounded w-full"
                      value={type}
                      onChange={(e) => setContentType(e.target.value as ContentType)}
                    >
                      <option value="">Select Type</option>
                      <option value={ContentType.Youtube}>YouTube</option>
                      <option value={ContentType.Twitter}>Twitter</option>
                      <option value={ContentType.Image}>Image</option>
                      {/* <option value={ContentType.Instagram}>Instagram</option> */}
                      <option value={ContentType.Text}>Text</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                  <Button varient="greendark" size="md" title="Submit" onclick={addContent}></Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}