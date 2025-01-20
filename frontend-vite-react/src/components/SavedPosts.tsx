import { Header } from './Header'
import PostList from './PostList'

export default function SavedPosts() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Saved Posts</h1>
        <PostList category="saved" selectedTags={[]} />
      </main>
    </div>
  )
} 