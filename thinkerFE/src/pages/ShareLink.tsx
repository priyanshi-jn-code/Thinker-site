import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { SideBar } from "../components/ui/SideBar";
import { Card } from "../components/ui/Card";
// import { useContent } from "../hooks/useContent";


export function ShareLink() {
  const { shareLink } = useParams(); 
  const [sharedUser, setSharedUser] = useState("");
  const [sharedContent, setSharedContent] = useState<{_id: string ,link : string , title :string , type:"twitter" | "youtube" | "instagram" | "image" | "text" ,userId: string }[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null); // To track selected type
    //  const { contentsData } = useContent();
   
  const filteredData = selectedType 
    ? sharedContent.filter(({ type }) => type === selectedType) 
    : sharedContent;


  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/think/${shareLink}`)
      .then((response) => {
        const username = response.data.username;
        const content = response.data.content
        setSharedUser(username); 
        setSharedContent(content)
      })
      .catch((error) => {
        console.error("Error fetching shared user data:", error);
      });
  }, [shareLink]);

  return <>
    <div className='bg-green-900 flex justify-start min-h-screen'>
            <div className='min-h-screen w-[270px] bg-neonforshare bg-no-repeat bg-cover'><SideBar onTypeSelect={setSelectedType} /></div>
        <div className=" min-h-screen sm:w-full">
          
          <div className="flex justify-end gap-4  sm:pt-4 pr-2 ml-8  ">
           
              <div className="flex justify-center sm:gap-4 right-0  fixed w-5/6 p-5 top-0 bg-green-900"> 
                <h1 className="text-green-200 text-4xl font-bold">Brain of : {sharedUser}</h1>
              </div>
           </div>
          <div className="flex gap-4 pt-8 flex-wrap justify-center sm:justify-center mr-4 mt-4 sm:mt-10">
          {filteredData.map(({ type, link, title, _id }) => (
                <Card title={title} link={link} type={type} key={_id} contentId={_id} />
              ))}
          </div>
        </div>
      </div> 
      
  </>  
}
