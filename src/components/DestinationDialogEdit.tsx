"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
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
import { cn } from "cn";
import { gettokenformserverClient } from "@/lib/getTokenFormClient";

export type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: number | string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

/** Shared field styling: filled, borderless (matches the add-destination form). */
const fieldClass = "h-9 rounded-md border-transparent bg-muted px-3";

const labelClass = "text-[13px] font-semibold";

type FormState = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

function toFormState(destination: Destination): FormState {
  return {
    destinationName: destination.destinationName,
    country: destination.country,
    category: destination.category,
    price: String(destination.price),
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  };
}

export default function DestinationDialogEdit({
  destination,
}: {
  destination: Destination;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(() => toFormState(destination));

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((previous) => ({ ...previous, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    const token = await gettokenformserverClient()
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-destination/${destination._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", 
            authorization: ` Bearer ${token}`

           },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) throw new Error("Failed to update destination");

      setOpen(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    // Re-seed the form with the latest server data each time it opens.
    if (nextOpen) setForm(toFormState(destination));
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" className="h-9 gap-2 rounded-md px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Edit
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Update Travel Package</DialogTitle>
            <DialogDescription>
              Make changes to the travel package details below
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            {/* Destination Name — label hidden to match the design */}
            <Field>
              <Label htmlFor="edit-destinationName" className="sr-only">
                Destination Name
              </Label>
              <Input
                id="edit-destinationName"
                name="destinationName"
                required
                placeholder="Bali Paradise"
                value={form.destinationName}
                onChange={handleChange("destinationName")}
                className={fieldClass}
              />
            </Field>

            {/* Country + Category */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <Label htmlFor="edit-country" className={labelClass}>
                  Country
                </Label>
                <Input
                  id="edit-country"
                  name="country"
                  required
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={handleChange("country")}
                  className={fieldClass}
                />
              </Field>

              <Field>
                <Label htmlFor="edit-category" className={labelClass}>
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
                    id="edit-category"
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
              </Field>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <Label htmlFor="edit-price" className={labelClass}>
                  Price (USD)
                </Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min={0}
                  required
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={handleChange("price")}
                  className={fieldClass}
                />
              </Field>

              <Field>
                <Label htmlFor="edit-duration" className={labelClass}>
                  Duration
                </Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  required
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={handleChange("duration")}
                  className={fieldClass}
                />
              </Field>
            </div>

            {/* Departure Date */}
            <Field>
              <Label htmlFor="edit-departureDate" className={labelClass}>
                Departure Date
              </Label>
              <Input
                id="edit-departureDate"
                name="departureDate"
                type="date"
                value={form.departureDate}
                onChange={handleChange("departureDate")}
                className={fieldClass}
              />
            </Field>

            {/* Image URL */}
            <Field>
              <Label htmlFor="edit-imageUrl" className={labelClass}>
                Image URL
              </Label>
              <Input
                id="edit-imageUrl"
                name="imageUrl"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={handleChange("imageUrl")}
                className={fieldClass}
              />
            </Field>

            {/* Description */}
            <Field>
              <Label htmlFor="edit-description" className={labelClass}>
                Description
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                placeholder="Describe the travel experience..."
                value={form.description}
                onChange={handleChange("description")}
                className="min-h-24 rounded-md border-transparent bg-muted px-3 py-2.5"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="bg-background">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-md border-destructive/30 text-destructive hover:bg-destructive/5 hover:text-destructive"
                >
                  <Trash2 />
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={saving}
              className="gap-2 rounded-md bg-cyan-500 px-4 font-semibold text-white hover:bg-cyan-400 focus-visible:ring-cyan-500/40"
            >
              <Save />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
