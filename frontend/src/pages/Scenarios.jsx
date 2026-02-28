import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { Image } from '../components/ui/Image'
import { getScenarios } from '../services/scenariosService'

export default function Scenarios() {
  const [scenarios, setScenarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getScenarios()
      .then((res) => {
        const list = res?.scenarios ?? []
        if (!cancelled) setScenarios(Array.isArray(list) ? list : [])
      })
      .catch(() => {
        if (!cancelled) setScenarios([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="section-title">Conversation scenarios</h1>
        <p className="section-subtitle">
          Practice real-world dialogues: ordering food, asking for directions, and meeting people.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((s) => (
          <Link key={s.id} to={`/scenarios/${s.id}`}>
            <Card className="h-full overflow-hidden card-hover group">
              <div className="aspect-video overflow-hidden rounded-t-xl bg-muted">
                <Image
                  src={s.imageUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{s.title}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <Link to="/lessons"><Button variant="outline">Back to lessons</Button></Link>
      </div>
    </div>
  )
}
