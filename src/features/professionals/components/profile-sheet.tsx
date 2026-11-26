"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import type { Professional } from "../types"
import { ProfileDetails } from "./profile-details"
import { SaveProfessionalButton } from "./save-professional-button"

interface ProfileSheetProps {
  professional?: Professional
  open: boolean
  onOpenChange: (open: boolean) => void
  isSaved: boolean
  onToggleSaved: () => void
}

export function ProfileSheet({
  professional,
  open,
  onOpenChange,
  isSaved,
  onToggleSaved,
}: ProfileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        showCloseButton={false}
        overlayClassName="bg-black/50 supports-backdrop-filter:backdrop-blur-none"
        className="gap-0 data-[side=right]:border-l-0 data-[side=right]:w-full data-[side=right]:sm:max-w-160"
      >
        {professional && (
          <>
            <SheetHeader className="min-h-18 flex-row items-center gap-4 px-4 py-3 md:px-6">
              <SheetTitle className="flex-1 text-xl leading-[1.2] text-ink-strong">
                <span className="sr-only">{professional.name}, </span>
                Professional profile
              </SheetTitle>
              <SaveProfessionalButton
                variant="label"
                name={professional.name}
                isSaved={isSaved}
                onToggle={onToggleSaved}
              />
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Close profile"
                    className="-mr-2 text-ink-strong"
                  />
                }
              >
                <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
              </SheetClose>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-2 pb-8 md:px-6">
              <ProfileDetails professional={professional} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
