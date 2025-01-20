import { createBrowserRouter } from 'react-router-dom'
import Home from './app/page'
import SavedPosts from './components/SavedPosts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/saved',
    element: <SavedPosts />,
  },
]) 