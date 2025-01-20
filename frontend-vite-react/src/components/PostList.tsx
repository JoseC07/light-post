'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getPosts, savePost, unsavePost } from '@/lib/api'
import { Paperclip, MapPin, ThumbsUp, ThumbsDown, BookmarkPlus, BookmarkMinus, Image } from 'lucide-react'
import { ExpandableContent } from './ExpandableContent'
import { FullScreenImage } from './FullScreenImage'

interface Post {
  id: string
  title: string
  content: string
  location: string
  createdAt: string
  category: string
  tags: string[]
  upvotes: number
  downvotes: number
  attachment?: string
  images: string[]
  saved: boolean
}

interface PostListProps {
  category: string
  selectedTags: string[]
}

const tagColors: { [key: string]: string } = {
  'policy change': 'bg-blue-100 text-blue-800',
  'visa': 'bg-green-100 text-green-800',
  'skilled workers': 'bg-purple-100 text-purple-800',
  'wildfire': 'bg-red-100 text-red-800',
  'red flag': 'bg-orange-100 text-orange-800',
  'safety': 'bg-yellow-100 text-yellow-800',
  'community': 'bg-indigo-100 text-indigo-800',
  'gardening': 'bg-pink-100 text-pink-800',
  'volunteers': 'bg-teal-100 text-teal-800',
  'legal advice': 'bg-cyan-100 text-cyan-800',
  'Q&A': 'bg-lime-100 text-lime-800',
  'visa application': 'bg-emerald-100 text-emerald-800',
  'brush fire': 'bg-rose-100 text-rose-800',
  'containment': 'bg-fuchsia-100 text-fuchsia-800',
  'community meeting': 'bg-violet-100 text-violet-800',
}

export default function PostList({ category, selectedTags }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts(category)
      setPosts(fetchedPosts)
    }
    fetchPosts()
  }, [category])

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            upvotes: voteType === 'up' ? post.upvotes + 1 : post.upvotes,
            downvotes: voteType === 'down' ? post.downvotes + 1 : post.downvotes
          } 
        : post
    ))
  }

  const handleSave = async (postId: string) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, saved: !post.saved } : post
    )
    setPosts(updatedPosts)
    
    if (updatedPosts.find(p => p.id === postId)?.saved) {
      await savePost(postId)
    } else {
      await unsavePost(postId)
    }
  }

  const filteredPosts = selectedTags.length > 0
    ? posts.filter(post => post.tags.some(tag => selectedTags.includes(tag)))
    : posts

  return (
    <div className="space-y-6">
      <h2>Posts for {category}</h2>
      {filteredPosts.map((post, index) => (
        <Card 
          key={post.id} 
          className={`bg-white hover:shadow-lg transition-all duration-300 ${
            index === 0 ? 'shadow-xl' : 'shadow-md'
          }`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpandableContent content={post.content} maxLength={150} />
            {post.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {post.images.map((image, index) => (
                  <div key={index} className="relative aspect-video cursor-pointer" onClick={() => setFullScreenImage(image)}>
                    <img src={image || "/placeholder.svg"} alt={`Post image ${index + 1}`} className="object-cover w-full h-full rounded" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-200 flex items-center justify-center">
                      <Image className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className={tagColors[tag] || 'bg-gray-100 text-gray-800'}>
                  {tag}
                </Badge>
              ))}
            </div>
            {post.attachment && (
              <div className="flex items-center space-x-2 text-blue-500 mt-4">
                <Paperclip className="w-4 h-4" />
                <a href={post.attachment} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  View attachment
                </a>
              </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  onClick={() => handleVote(post.id, 'up')}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.upvotes}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  onClick={() => handleVote(post.id, 'down')}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{post.downvotes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                  onClick={() => handleSave(post.id)}
                >
                  {post.saved ? <BookmarkMinus className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                  <span>{post.saved ? 'Unsave' : 'Save'}</span>
                </Button>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{post.location}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
      {fullScreenImage && (
        <FullScreenImage
          src={fullScreenImage}
          alt="Full screen post image"
          onClose={() => setFullScreenImage(null)}
        />
      )}
    </div>
  )
}

