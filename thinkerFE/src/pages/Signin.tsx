import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { InputBox } from "../components/ui/InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Errors = {
  password?: string;
  email?: string;
  global?: string;
};

export function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});

  async function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setErrors({}); // Reset errors before making a request

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        email: email,
        password: password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const backendErrors = err.response?.data.errors || []; // Backend errors
        const mappedErrors = backendErrors.reduce((acc: Errors, error: any) => {
          //@ts-ignore
          acc[error.field] = error.message; // Map errors by field
          return acc;
        }, {});

        setErrors({
          ...mappedErrors,
          global: err.response?.data.message ,
        });
      } else {
        setErrors({ global: "An unexpected error occurred. Please try again." });
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-neonbg bg-no-repeat bg-cover fixed flex justify-center opacity-90 top-0 left-0">
      <div className="flex justify-center flex-col">
        <span className="bg-white opacity-100 p-2 rounded w-72">
          <div className="font-bold text-green-800 flex justify-center underline">Sign-In</div>

          <div>
            <InputBox placeholder="Email" referance={emailRef} wdsize="w-64" />
            {errors.email && <p className="mt-0 ml-2 text-red-500 text-[10px] mb-2">{errors.email}</p>}

            <InputBox placeholder="Password" referance={passwordRef} wdsize="w-64" />
            {errors.password && <p className="mt-0 ml-2 text-red-500 text-[10px]">{errors.password}</p>}

            {errors.global && (
              <p className="mt-0 ml-2 text-red-500 text-[10px] mb-2">{errors.global}</p>
            )}

            <div className="flex justify-center">
              <Button varient="greendark" size="md" title="Sign-In" onclick={signin} />
            </div>
            <div className="flex justify-center">
              <p className="mt-2 ml-2 text-black text-[12px] mb-2">
                Not A User? <a href="/signup" className="underline text-green-600 font-bold">Sign-up</a>
              </p>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}
