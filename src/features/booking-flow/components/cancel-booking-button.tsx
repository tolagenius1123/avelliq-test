"use client"

import { useRouter } from "next/navigation"

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
import { ROUTES } from "@/config/site"

export function CancelBookingButton({ disabled }: { disabled: boolean }) {
  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="link"
            disabled={disabled}
            className="relative h-auto p-0 font-normal after:absolute after:-inset-3"
          />
        }
      >
        Cancel
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-primary">Cancel this booking?</AlertDialogTitle>
          <AlertDialogDescription>
            The details you entered will be cleared. Nothing has been charged.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline-primary" size="pill-sm" className="h-11">
            Keep booking
          </AlertDialogCancel>
          <AlertDialogAction
            size="pill-sm"
            className="h-11"
            onClick={() => router.push(ROUTES.findCare)}
          >
            Cancel booking
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
