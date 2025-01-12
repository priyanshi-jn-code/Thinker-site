export function InputBox( {placeholder , referance ,wdsize} : {referance? : any, placeholder? : string , wdsize:string} ){
    return <input ref={referance} placeholder={placeholder} type="text" className={ `bg-white border rounded px-4 py-2 m-2 placeholder-brown-800 w-64 ${wdsize}`} >
    
    </input>
}