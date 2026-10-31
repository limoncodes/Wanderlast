
"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { redirect } from "next/navigation"

export default function DestinationdetailsDelet({id}:{id:string}) {
    
    const handledelet = async () => {
        console.log(id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination/${id}`, {
            method: "DELETE",
            

        })
        const data = await res.json()
        console.log(data)
        redirect(`${process.env.BETTER_AUTH_URL}/destination`)
        
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button
                variant="outline"
                className="h-9 gap-2 rounded-md border-destructive/30 px-4 text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
                <Trash2 />
                Delete
            </Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handledelet}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
