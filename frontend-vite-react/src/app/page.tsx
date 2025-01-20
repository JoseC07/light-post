import { Header } from '@/components/Header'
import CreatePostForm from '@/components/CreatePostForm'
import { PostTabs } from '@/components/PostTabs'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <CreatePostForm />
          </div>
          <div className="md:col-span-2">
            <PostTabs />
          </div>
        </div>
      </main>
    </div>
  )
}

