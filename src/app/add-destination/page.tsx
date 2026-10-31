"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { EB_Garamond } from "next/font/google";
import { Save, Trash2 } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { gettokenformserverClient } from "@/lib/getTokenFormClient";


const headingFont = EB_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
});

const categories = [
    "Beach",
    "Mountain",
    "City",
    "Adventure",
    "Cultural",
    "Wildlife",
];

/** Shared field styling: filled, borderless (matches the design's light inputs). */
const fieldClass = "h-9 rounded-md border-transparent bg-muted px-3";

const labelClass = "text-[13px] font-semibold";

const initialForm = {
    destinationName: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

const AddDestinationPage = () => {
    const [form, setForm] = useState(initialForm);

    const handleChange =
        (field: keyof typeof initialForm) =>
            (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((previous) => ({ ...previous, [field]: event.target.value }));
            };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await gettokenformserverClient()
       //
        // No backend yet — collect the package payload here.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)
         window.location.href = "/destination";
         

        // console.log("New travel package:", form);
    };

    const handleCancel = () => setForm(initialForm);

    return (
        <section className="px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
            <div className="mx-auto max-w-4xl">
                <h1 className={cn(headingFont.className, "text-3xl leading-tight sm:text-4xl")}>
                    Add New Travel Package
                </h1>

                <Card className="mx-auto mt-8 w-full max-w-lg shadow-sm sm:mt-12 [--card-spacing:--spacing(7)]">
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Destination Name */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="destinationName" className={labelClass}>
                                    Destination Name
                                </Label>
                                <Input
                                    id="destinationName"
                                    name="destinationName"
                                    required
                                    placeholder="Bali Paradise"
                                    value={form.destinationName}
                                    onChange={handleChange("destinationName")}
                                    className={fieldClass}
                                />
                            </div>

                            {/* Country + Category */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="country" className={labelClass}>
                                        Country
                                    </Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        required
                                        placeholder="Indonesia"
                                        value={form.country}
                                        onChange={handleChange("country")}
                                        className={fieldClass}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="category" className={labelClass}>
                                        Category
                                    </Label>
                                    <Select
                                        name="category"
                                        value={form.category}
                                        onValueChange={(value) =>
                                            setForm((previous) => ({
                                                ...previous,
                                                category: value ?? previous.category,
                                            }))
                                        }
                                    >
                                        <SelectTrigger
                                            id="category"
                                            className={cn(fieldClass, "h-9! w-full")}
                                        >
                                            <SelectValue placeholder="Beach" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Price + Duration */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="price" className={labelClass}>
                                        Price (USD)
                                    </Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min={0}
                                        required
                                        placeholder="e.g., 1299"
                                        value={form.price}
                                        onChange={handleChange("price")}
                                        className={fieldClass}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="duration" className={labelClass}>
                                        Duration
                                    </Label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        placeholder="e.g., 7 Days/6 Nights"
                                        value={form.duration}
                                        onChange={handleChange("duration")}
                                        className={fieldClass}
                                    />
                                </div>
                            </div>

                            {/* Departure Date */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="departureDate" className={labelClass}>
                                    Departure Date
                                </Label>
                                <Input
                                    id="departureDate"
                                    name="departureDate"
                                    type="date"
                                    value={form.departureDate}
                                    onChange={handleChange("departureDate")}
                                    className={fieldClass}
                                />
                            </div>

                            {/* Image URL */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="imageUrl" className={labelClass}>
                                    Image URL
                                </Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={form.imageUrl}
                                    onChange={handleChange("imageUrl")}
                                    className={fieldClass}
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description" className={labelClass}>
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe the travel experience..."
                                    value={form.description}
                                    onChange={handleChange("description")}
                                    className="min-h-24 rounded-md border-transparent bg-muted px-3 py-2.5"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="h-9 gap-2 rounded-md border-destructive/30 px-4 text-destructive hover:bg-destructive/5 hover:text-destructive"
                                >
                                    <Trash2 />
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-9 gap-2 rounded-md bg-cyan-500 px-4 font-semibold text-white hover:bg-cyan-400 focus-visible:ring-cyan-500/40"
                                >
                                    <Save />
                                    Add Travel Package
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default AddDestinationPage;