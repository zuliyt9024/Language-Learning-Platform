import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import Quiz from './pages/Quiz'
import Progress from './pages/Progress'
import Goals from './pages/Goals'
import Flashcards from './pages/Flashcards'
import Scenarios from './pages/Scenarios'
import ScenarioDetail from './pages/ScenarioDetail'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const PAGE_TITLES = {
  '/': 'Home',
  '/login': 'Sign in',
  '/signup': 'Create account',
  '/lessons': 'Lessons',
  '/dashboard': 'Dashboard',
  '/progress': 'Your progress',
  '/goals': 'Daily goals',
  '/flashcards': 'Flashcards',
  '/scenarios': 'Scenarios',
  '/profile': 'Profile',
}

function PageTitle() {
  const location = useLocation()
  useEffect(() => {
    const base = PAGE_TITLES[location.pathname.split('/').slice(0, 2).join('/')] || PAGE_TITLES[location.pathname]
    document.title = base ? `${base} – Language Learning Platform` : 'Language Learning Platform'
  }, [location.pathname])
  return null
}

function AppRoutes() {
  return (
    <>
      <PageTitle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/lessons/:lessonId/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/scenarios/:id" element={<ScenarioDetail />} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
