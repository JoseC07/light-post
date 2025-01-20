'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X } from 'lucide-react'

interface FullScreenImageProps {
  src: string
  alt: string
  onClose: () => void
}

export function FullScreenImage({ src, alt, onClose }: FullScreenImageProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <img src={src} alt={alt} className="w-full h-auto" />
      </DialogContent>
    </Dialog>
  )
}

