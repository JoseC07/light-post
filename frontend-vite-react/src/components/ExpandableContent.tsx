'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExpandableContentProps {
  content: string
  maxLength?: number
}

export function ExpandableContent({ content, maxLength = 100 }: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldTruncate = content.length > maxLength
  const displayContent = isExpanded ? content : content.slice(0, maxLength) + '...'

  return (
    <div>
      <p className="text-gray-600 mb-2">{displayContent}</p>
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Read more
            </>
          )}
        </Button>
      )}
    </div>
  )
}

