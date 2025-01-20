'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BookmarkIcon, LogIn, LogOut } from 'lucide-react'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">Light Post</Link>
          <Link to="/saved" className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
            <BookmarkIcon className="w-5 h-5" />
            <span>Saved Posts</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={handleLoginLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={handleLoginLogout}>
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

