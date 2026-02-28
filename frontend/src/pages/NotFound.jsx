import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="rounded-full bg-muted w-24 h-24 flex items-center justify-center mb-6">
        <span className="text-4xl font-bold text-muted-foreground">404</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        The page you're looking for doesn't exist or may have been moved. Use the links below to get back on track.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Link to="/">
          <Button>Back to home</Button>
        </Link>
        <Link to="/lessons">
          <Button variant="outline">Browse lessons</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
