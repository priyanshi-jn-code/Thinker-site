import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Logo } from "../icons/Logo";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
// import Typewriter from "typewriter-effect";

export default function Start() {
  const navigate = useNavigate();
  useGSAP(()=>{
    const buttons = document.querySelectorAll(".btn");
  console.log(buttons);
   gsap.to("#text" , {
    ease : 'back.inOut',
    opacity : 1,
    y : 0,
   })
   
    gsap.from(".btn" , {
      y : -50,
  
      duration : 2
    })
    gsap.to("#start-img" , {
     opacity : 1,
     duration : 2
    })
    if(window.innerWidth > 760){
    gsap.to(".box-1" , {
      x : 270, 
      duration : 2
     })
     gsap.fromTo(".box-2" , {
      x : 400, 
      duration : 2
     },{
      x : 130, 
      duration : 2
     })
     gsap.to(".box-3" , {
      x : 300, 
      duration : 2
     })}
     else{
     gsap.to(".box-4" , {
      y : -100, 
      duration : 2,
  })
    gsap.to(".box-5" , {
      y : -100, 
      duration : 2,
  })
    gsap.to(".box-6" , {
      y : -100, 
      duration : 2,
  })} 
    
   gsap.fromTo(".para" , {
     opacity : 0 ,
     y : 10
   } ,{
    opacity : 1 ,
    y : 40,
    delay : 1,
    stagger : 0.1
   })
  } , [])
  
  return (
    
    <div className="flex bg-neonbg bg-no-repeat bg-cover flex-col lg:flex-row ">

      <div className="w-full lg:w-1/2 h-full lg:h-screen ">
        <div className="font-bolder flex justify-center gap-2 items-center sm:justify-start pl-3 mt-3 ">
          <Logo />
          <div className="font-bold text-2xl text-green-500 sm:text-2xl text-3xl ">THINKER</div>
        </div>
        <div className="max-w-full mx-auto mt-20 ">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-center sm:text-left h-[250px] sm:h-[300px] sm:w-[700px] sm:mt-20 m-5 sm:ml-8">
           <h1 id="text" className="opacity-0 translate-y-10 text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-green-600">
             Welcome To <span className="font-extrabold text-green-500 sm:text-4xl text-3xl">Thinker</span> 
           </h1>
           <p className="para mt-5 text-lg sm:text-xl md:text-2xl font-bold font-serif text-green-100 ">
           Thinker Website is used to collect your Youtube, Twitter, Image and Text data with functions like add, delete, and share.
           </p>
           <p className="para mt-5 text-lg sm:text-xl md:text-2xl font-bold font-serif text-green-200">
            Developed By Priyanshi
           </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 block p-4 sm:block ">
        <div className="flex justify-center gap-5 mr-5 mt-5 sm:justify-end">
          <Button ani="btn" size="md" varient="greendark" title="Signup" onclick={() => {
            navigate("/signup");
          }} />
          <Button ani="btn" size="md" varient="greenlight" title="Signin" onclick={() => {
            navigate("/signin");
          }} />
        </div>
       
          { window.innerWidth >760 ? <div className="opacity-0 hover:opacity-5 transition-all flex flex-col mt-10 h-48 w-48 lg:h-[500px] lg:w-[500px] mx-auto" id="start-img">
         <div className="bg-second bg-no-repeat bg-cover box-1 h-[134px] w-[134px] hover:h-[200px] hover:w-[200px]  rounded-full "></div>
         <div className="bg-first bg-no-repeat bg-cover box-2 h-[134px] w-[134px] hover:h-[200px] hover:w-[200px] rounded-full"></div>
         <div className="bg-third bg-no-repeat bg-cover box-3 h-[134px] w-[134px]  hover:h-[200px] hover:w-[200px] rounded-full"></div>
        </div>
         : 
        <div  className="opacity-0  hover:opacity-5 transition-all m-2 h-44 bottom-0" id="start-img">
          <div className="h-32"></div>
          <div className="flex justify-between items-center">
          <div className="bg-first bg-no-repeat bg-cover box-4 h-24 w-24 rounded-full "></div>
         <div className="bg-second bg-no-repeat bg-cover box-5 h-24 w-24 rounded-full"></div>
         <div className="bg-third bg-no-repeat bg-cover box-6 h-24 w-24  rounded-full"></div>
          </div>
        </div> }
        
        


      </div>

    </div>
  );
}
