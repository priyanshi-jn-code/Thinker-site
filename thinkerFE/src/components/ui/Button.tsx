import { ReactElement } from "react";

const buttonVarient = {
    "primary" : "bg-brown-800 text-white hover:bg-brown-900 ", 
    "secondary" : "bg-brown-200 text-brown-900 hover:bg-brown-800 hover:text-white border border-brown-800",
    "greenlight" : "bg-green-300 text-green-900 hover:bg-green-800 hover:text-green-200",
    "greendark" : "bg-green-900 text-green-200 hover:bg-green-300 hover:text-green-900 border border-green-200"    
}

const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "sm:px-2 sm:py-2 text-md rounded-md px-1 py-1",
    "sm": "px-2 py-1 text-sm rounded-md",
}

 interface ButtonProps {
   title: string;
   varient : "primary" | "secondary" | "greendark" | "greenlight",
   size : "sm" | "md" | "lg",
   startIcon? : ReactElement ,
   endIcon? : ReactElement ,
   onclick? : () => void,
   ani? : string,


}

export function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onclick}
            className={`${sizeStyles[props.size]} ${buttonVarient[props.varient]} ${props.ani || ""}`}
        > 
            <div className="flex items-center">
                <span className="text-xs">
                    {props.startIcon}
                </span>
                <div className="pl-2 pr-2">
                    {props.title}
                </div>
                {props.endIcon}
            </div>
        </button>
    );
}
