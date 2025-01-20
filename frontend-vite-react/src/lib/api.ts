import { v4 as uuidv4 } from 'uuid'

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

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'New Immigration Policy Announced',
    content: "The government has announced a new immigration policy that will affect visa applications starting next month. Key changes include streamlined processes for skilled workers and updated family reunification guidelines. Applicants are advised to review the new requirements carefully before submitting their applications.",
    location: '38.89, -77.03',
    createdAt: new Date().toISOString(),
    category: 'immigration',
    tags: ['policy change', 'visa', 'skilled workers'],
    upvotes: 45,
    downvotes: 5,
    attachment: 'https://example.com/new_immigration_policy.pdf',
    images: ['/placeholder.svg?height=200&width=300', '/placeholder.svg?height=200&width=300'],
    saved: false,
  },
  {
    id: '2',
    title: 'Wildfire Warning: Red Flag Conditions',
    content: "The National Weather Service has issued a red flag warning for our area due to high winds and low humidity. Residents are urged to exercise extreme caution with any potential fire sources. Keep updated on local news and be prepared to evacuate if necessary. Remember to create a defensible space around your property and have an emergency kit ready.",
    location: '34.05, -118.24',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    category: 'fire',
    tags: ['wildfire', 'red flag', 'safety'],
    upvotes: 89,
    downvotes: 2,
    images: ['/placeholder.svg?height=200&width=300'],
    saved: false,
  },
  {
    id: '3',
    title: 'Community Garden Initiative',
    content: "We're excited to announce the launch of our neighborhood's first community garden! Located at the corner of Oak and Maple streets, this project aims to bring neighbors together while promoting sustainable living. We're looking for volunteers to help with the initial setup this weekend. No gardening experience necessary - just bring your enthusiasm!",
    location: '40.71, -74.01',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    category: 'general',
    tags: ['community', 'gardening', 'volunteers'],
    upvotes: 32,
    downvotes: 1,
    images: [],
    saved: false,
  },
  {
    id: '4',
    title: 'Immigration Lawyer Q&A Session',
    content: "Join us for a free Q&A session with experienced immigration lawyer, Jane Doe. This virtual event will cover recent changes to immigration laws, common visa application mistakes, and tips for a successful application. There will be time for attendees to ask specific questions. The session is scheduled for next Tuesday at 7 PM EST.",
    location: '42.36, -71.06',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    category: 'immigration',
    tags: ['legal advice', 'Q&A', 'visa application'],
    upvotes: 67,
    downvotes: 3,
    attachment: 'https://example.com/immigration_qa_flyer.pdf',
    images: [],
    saved: false,
  },
  {
    id: '5',
    title: 'Brush Fire Contained: Thank You Firefighters',
    content: "The recent brush fire in the western hills has been successfully contained thanks to the tireless efforts of our local fire department. While the danger has passed, residents are reminded to remain vigilant and continue following fire safety guidelines. A community meeting will be held this Friday to discuss ongoing fire prevention strategies.",
    location: '37.77, -122.42',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    category: 'fire',
    tags: ['brush fire', 'containment', 'community meeting'],
    upvotes: 103,
    downvotes: 0,
    images: [],
    saved: false,
  },
]

let posts: Post[] = [...mockPosts]

export async function createPost({ title, content, attachment, category, tags, images }: { title: string; content: string; attachment: File | null; category: string; tags: string[]; images: File[] }) {
  const location = await getCurrentLocation()
  const attachmentUrl = attachment ? await uploadAttachment(attachment) : undefined
  const imageUrls = await Promise.all(images.map(uploadAttachment))
  const newPost: Post = {
    id: uuidv4(),
    title,
    content,
    location,
    createdAt: new Date().toISOString(),
    category,
    tags,
    upvotes: 0,
    downvotes: 0,
    attachment: attachmentUrl,
    images: imageUrls,
    saved: false,
  }
  posts.unshift(newPost)
  return newPost
}

export const getPosts = async (category: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockPosts.filter(post => 
    category === 'saved' ? post.saved : post.category === category
  )
}

export const getAllTags = () => {
  const allTags = new Set<string>()
  mockPosts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag))
  })
  return Array.from(allTags)
}

export const savePost = async (postId: string) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const post = mockPosts.find(p => p.id === postId)
  if (post) {
    post.saved = true
  }
}

export const unsavePost = async (postId: string) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const post = mockPosts.find(p => p.id === postId)
  if (post) {
    post.saved = false
  }
}

async function getCurrentLocation(): Promise<string> {
  return new Promise((resolve) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          resolve(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`)
        },
        () => {
          resolve('Unknown location')
        }
      )
    } else {
      resolve('Geolocation not supported')
    }
  })
}

async function uploadAttachment(file: File): Promise<string> {
  // In a real application, you would upload the file to a server or cloud storage
  // For this example, we'll just return a fake URL
  return `https://fake-upload-url.com/${file.name}`
}

