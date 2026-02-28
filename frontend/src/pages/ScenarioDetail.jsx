import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { Image } from '../components/ui/Image'
import { getScenario } from '../services/scenariosService'

export default function ScenarioDetail() {
  const { id } = useParams()
  const [scenario, setScenario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stepIndex, setStepIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    let cancelled = false
    if (!id) {
      setLoading(false)
      return
    }
    getScenario(id)
      .then((data) => {
        if (!cancelled) setScenario(data ?? null)
      })
      .catch(() => {
        if (!cancelled) setScenario(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [id])

  useEffect(() => {
    setStepIndex(0)
    setRevealed(false)
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }
  if (!scenario) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Scenario not found.</p>
        <Link to="/scenarios"><Button>Back to scenarios</Button></Link>
      </div>
    )
  }

  const steps = Array.isArray(scenario.steps) ? scenario.steps : []
  const step = steps[stepIndex]
  const hasNext = stepIndex < steps.length - 1
  const hasPrev = stepIndex > 0
  const safeStep = step ?? {}

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/scenarios" className="text-sm text-primary hover:underline">
        ← Back to scenarios
      </Link>

      <Card className="overflow-hidden shadow-lg">
        <div className="aspect-video bg-muted">
          <Image src={scenario.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">{scenario.title}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
          <div className="mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm font-medium text-primary">Situation</p>
            <p className="text-sm text-muted-foreground mt-1">{scenario.situation}</p>
          </div>
        </CardHeader>
      </Card>

      {steps.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No steps in this scenario yet.</p>
      ) : (
        <>
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Step {stepIndex + 1} of {steps.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">They say / Prompt</p>
                <p className="font-medium">{safeStep.prompt ?? ''}</p>
              </div>
              {!revealed ? (
                <Button variant="outline" size="sm" onClick={() => setRevealed(true)}>
                  Show my response
                </Button>
              ) : (
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">You say</p>
                    <p className="font-medium text-primary">{safeStep.response ?? ''}</p>
                  </div>
                  {safeStep.hint && (
                    <p className="text-xs text-muted-foreground italic">Hint: {safeStep.hint}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button variant="outline" disabled={!hasPrev} onClick={() => { setStepIndex((i) => i - 1); setRevealed(false); }}>
              ← Previous
            </Button>
            {hasNext ? (
              <Button onClick={() => { setStepIndex((i) => i + 1); setRevealed(false); }}>
                Next step →
              </Button>
            ) : (
              <Link to="/scenarios">
                <Button>Finish scenario</Button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}
