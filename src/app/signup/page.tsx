"use client";

import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

/** Filled, light inputs — matches the design's borderless field style. */
const fieldClass =
    "h-9 rounded-md border-transparent bg-muted pl-9 text-sm placeholder:text-muted-foreground/80";

const labelClass = "text-sm font-semibold text-slate-900";

const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUp = () => {
    const router = useRouter();
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const handleChange =
        (field: keyof typeof initialForm) =>
            (event: ChangeEvent<HTMLInputElement>) => {
                setForm((previous) => ({ ...previous, [field]: event.target.value }));
            };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setPending(true);
        const { error: signUpError } = await authClient.signUp.email({
            name: form.name,
            email: form.email,
            password: form.password,
        });

   


        setPending(false);

        if (signUpError) {
            setError(signUpError.message ?? "Could not create your account. Please try again.");
            return;
        }
        console.log(form)

        router.push("/");
    };

    const handleGoogle = async () => {
        setError(null);
        const { error: googleError } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (googleError) {
            setError(googleError.message ?? "Google sign-up failed. Please try again.");
        }
    };

    return (
        <section className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center bg-[#F4F6F9] px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-light tracking-tight text-slate-900">
                    Create Account
                </h1>
                <p className="mt-2 text-slate-500">
                    Start your adventure with Wanderlust
                </p>
            </div>

            <Card className="w-full max-w-[29.5rem] rounded-xl shadow-[0_10px_40px_-16px_rgba(15,23,42,0.18)] ring-0 [--card-spacing:--spacing(8)]">
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className={labelClass}>
                                Full Name
                            </Label>
                            <div className="relative">
                                <FiUser className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    className={fieldClass}
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className={labelClass}>
                                Email Address
                            </Label>
                            <div className="relative">
                                <FiMail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    className={fieldClass}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className={labelClass}>
                                Password
                            </Label>
                            <div className="relative">
                                <FiLock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    value={form.password}
                                    onChange={handleChange("password")}
                                    className={fieldClass}
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirmPassword" className={labelClass}>
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <FiLock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    placeholder="Confirm your password"
                                    value={form.confirmPassword}
                                    onChange={handleChange("confirmPassword")}
                                    className={fieldClass}
                                />
                            </div>
                        </div>

                        {error ? (
                            <p role="alert" className="text-sm text-destructive">
                                {error}
                            </p>
                        ) : null}

                        <Button
                            type="submit"
                            disabled={pending}
                            className="h-10 w-full rounded-md bg-cyan-500 text-sm font-semibold text-white hover:bg-cyan-400 focus-visible:ring-cyan-500/40"
                        >
                            {pending ? "Creating Account..." : "Create Account"}
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <span className="h-px flex-1 bg-border" />
                            <span className="text-sm text-muted-foreground">
                                Or sign up with
                            </span>
                            <span className="h-px flex-1 bg-border" />
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogle}
                            className="h-10 w-full gap-2 rounded-md bg-background text-sm font-medium text-slate-900 hover:bg-muted"
                        >
                            <FcGoogle className="size-[1.15rem]" />
                            Sign Up With Google
                        </Button>

                        <p className="text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-cyan-600 outline-none hover:text-cyan-500 hover:underline focus-visible:ring-2 focus-visible:ring-ring/50"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};

export default SignUp;
