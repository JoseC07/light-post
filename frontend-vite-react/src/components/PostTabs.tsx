'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Globe, Scale, Flame, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PostList from './PostList'
import { getAllTags } from '@/lib/api'

const tabData = [
  { id: 'recent', label: 'Recent Posts', icon: Globe, tags: [] },
  { 
    id: 'immigration', 
    label: 'Immigration Laws', 
    icon: Scale, 
    tags: ['policy change', 'visa', 'legal advice', 'visa application'] 
  },
  { 
    id: 'fire', 
    label: 'Fire Alerts', 
    icon: Flame, 
    tags: ['wildfire', 'red flag', 'safety', 'brush fire', 'containment'] 
  },
  { 
    id: 'general', 
    label: 'General', 
    icon: MessageCircle, 
    tags: ['community', 'gardening', 'volunteers', 'community meeting'] 
  },
]

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

export function PostTabs() {
  const [activeTab, setActiveTab] = useState('recent')
  const [allTags, setAllTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isTagFilterOpen, setIsTagFilterOpen] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getAllTags()
      setAllTags(tags)
    }
    fetchTags()
  }, [])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const filteredTags = allTags.filter(tag => {
    if (activeTab === 'recent') return true
    return tabData.find(tab => tab.id === activeTab)?.tags?.includes(tag) || false
  })

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {tabData.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="my-4">
        <Button
          variant="outline"
          onClick={() => setIsTagFilterOpen(!isTagFilterOpen)}
          className="w-full justify-between"
        >
          <span>Filter by tags</span>
          {isTagFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
        {isTagFilterOpen && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filteredTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      {tabData.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <h2 className="text-2xl font-bold mb-4">{tab.label}</h2>
          <PostList category={tab.id} selectedTags={selectedTags} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

