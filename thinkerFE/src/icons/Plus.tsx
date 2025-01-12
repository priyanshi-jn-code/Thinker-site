import { IconProps, sizeVarients } from "./iconSize"

export const Plus = (props : IconProps) => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={sizeVarients[props.size]}>
  <path strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
    </div>
  )
}



