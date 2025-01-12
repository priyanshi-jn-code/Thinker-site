const varientStyle = {
  "primary" : " text-brown-900 hover:bg-brown-200 size-6", 
  "secondary" : " text-brown-200 hover:bg-brown-800 size-6 mr-1 mt-1", 
  "greenlight" : "text-green-300  hover:text-green-800 size-6",
    "greendark" : "text-green-900  hover:text-green-300 hover:bg-green-900 size-6" 

}
interface CrossProps {
  varient : "primary" | "secondary" | "greenlight" | 'greendark'
}

export function Cross( props : CrossProps){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={varientStyle[props.varient]}>
  <path strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

}

export function SideLine(){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

}