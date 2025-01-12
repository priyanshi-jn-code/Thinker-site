 export interface IconProps {
    "size"  : "sm" | "md" | "lg",
    onClick? : () => void,
    id? : String
}

  export const sizeVarients = {
    "sm"  : "sm:size-4 size-2",
    "md"  : "sm:size-6 size-4",
    "lg"  : "sm:size-8 size-6",
}

