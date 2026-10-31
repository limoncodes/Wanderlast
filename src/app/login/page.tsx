"use client"
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FiMail,
  FiLock,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void>=>{
    e.preventDefault();
    const formdata = new FormData(e.currentTarget)
    const user: LoginCredentials = {
      email: String(formdata.get("email") ?? ""),
      password: String(formdata.get("password") ?? ""),
    };
    const {data, error}= await authClient.signIn.email({
       ...user

    })
    if(data){
        console.log(data)
        redirect('/')
    }
    if(error){
        console.log(error)
    }
    
   
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-7">
      <div className="mx-auto w-full max-w-[514px]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
            Welcome Back
          </h1>
          <p className="mt-1 text-base text-[#71717a]">
            Resume your adventure with Wanderlust
          </p>
        </div>

        <div className="border border-[#eeeeee] bg-white p-6 shadow-md sm:p-8">
          <form onSubmit={handleLogin}
            
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-base font-medium text-[#171717]"
              >
                Email Address
              </Label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#71717a]" />

                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="h-[42px] rounded-none border-[#eeeeee] bg-[#f8fafc] pl-9 text-sm shadow-none placeholder:text-[#71717a] focus-visible:ring-[#16a3bd]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"

                className="text-base font-medium text-[#171717]"
              >
                Password
              </Label>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#71717a]" />

                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="h-[42px] rounded-none border-[#eeeeee] bg-[#f8fafc] pl-9 text-sm shadow-none placeholder:text-[#71717a] focus-visible:ring-[#16a3bd]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked === true)
                  }
                  className="rounded-none"
                />
                <Label
                  htmlFor="remember"
                  className="cursor-pointer text-sm font-normal text-[#71717a]"
                >
                  Remember me
                </Label>
              </div>

              <a
                href="/forgot-password"
                className="text-sm font-medium text-[#079fbd] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-none bg-[#17a2bb] text-sm font-medium text-white hover:bg-[#128ba1]"
            >
              Sign In
            </Button>

            <div className="flex items-center gap-3 py-0.5">
              <div className="h-px flex-1 bg-[#eeeeee]" />
              <span className="text-sm text-[#71717a]">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-[#eeeeee]" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-none border-[#eeeeee] bg-white text-sm font-normal text-[#171717] hover:bg-gray-50"
            >
              <FcGoogle className="mr-2 text-lg" />
              Sign Up With Google
            </Button>

            <p className="pt-1 text-center text-sm text-[#71717a]">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-[#079fbd] hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
