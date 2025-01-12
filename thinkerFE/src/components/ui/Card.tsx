import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Trash } from "../../icons/Dustbin";
import { Pencil } from "../../icons/Pencil";
import { Play } from "../../icons/Share";
import { useContent } from "../../hooks/useContent"
import { useEffect } from "react";


interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "image" | "text";
    contentId: string;
}

export function Card({ title, link, type, contentId }: CardProps) {

    function isImageUrl(link: string): boolean {
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
        return imageExtensions.test(link.split('?')[0]);
    }

    const { refresh } = useContent();
    useEffect(() => {
        refresh();
    }, []);

    async function deleteContentData(contentId: string) {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    'Token': token
                },
                data: {
                    contentId: contentId
                }
            });
            refresh();
        } catch (e) {
            console.error("Something went wrong in card component");
        }
    }

    return (
        <div className="bg-green-50 border-green-200 p-4 rounded-md w-full sm:w-80 md:w-72 border ml-4 mb-4 max-h-72 ">
            <div className="bg-green-50 flex justify-between">
                <div className="flex gap-1 text-green-800 hover:text-green-900 items-center">
                    
                    {window.innerWidth > 760 ? <Pencil size="md" /> :<Pencil size="lg" />} 
                    
                    <div
                    className="text-green-800 font-bold text-md max-w-36 max-h-6 hover:text-clip hover:overflow-x-auto truncate overflow-y-hidden whitespace-nowrap"
                      >
                     {title}
                    </div>
                </div>

                <div className="flex gap-1 hover:cursor-pointer items-center">
                    <button onClick={() => deleteContentData(contentId)} className=" text-green-800 hover:text-green-900">
                       {window.innerWidth > 760 ? <Trash size="md" /> : <Trash size="lg" />}  
                    </button>
                    <div>

                    {type === "youtube" && <a href={link} className=" text-green-800 hover:text-green-900" target="_blank" rel="noopener noreferrer">
                        {window.innerWidth > 760 ? <Play size="md" /> : <Play size="lg" />} 
                    </a> }
                    </div>
                    <div>

                    {type === "image" && <a href={link} className=" text-green-800 hover:text-green-900" target="_blank" rel="noopener noreferrer">
                    {window.innerWidth > 760 ? <Play size="md" /> : <Play size="lg" />} 
                    </a> }
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && (
                    <iframe
                        className="w-full aspect-video"
                        src={link.replace("youtu.be/", "www.youtube.com/embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}

                {type === "twitter" && (
                    <div className="max-h-48 overflow-y-auto overflow-x-hidden">
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                    </div>
                )}

                {type === "image" && isImageUrl(link) && (
                    <img
                        src={link}
                        alt="Embedded content"
                        className="w-full h-auto max-h-60 object-cover"
                        onError={(e) => { e.currentTarget.src = "/fallback-image.jpg" }}
                    />
                )}

                {type === "text" && (
                    <div>
                        <p className="bg-green-100 p-2 text-sm sm:text-base max-h-48 overflow-y-scroll break-words">
                            {link}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
