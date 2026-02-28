const progressByUser = new Map()

// Badge definitions: id, name, description, condition (receives progress state)
const BADGE_DEFS = [
  { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', check: (p) => p.completedLessonIds.length >= 1 },
  { id: 'five-lessons', name: 'Getting Started', description: 'Complete 5 lessons', check: (p) => p.completedLessonIds.length >= 5 },
  { id: 'ten-lessons', name: 'Dedicated Learner', description: 'Complete 10 lessons', check: (p) => p.completedLessonIds.length >= 10 },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Pass a lesson quiz', check: (p) => Object.keys(p.quizScores || {}).length >= 1 },
  { id: 'streak-3', name: 'On a Roll', description: '3-day streak', check: (p) => (p.streak || 0) >= 3 },
  { id: 'streak-7', name: 'Week Warrior', description: '7-day streak', check: (p) => (p.streak || 0) >= 7 },
  { id: 'goal-crusher', name: 'Goal Crusher', description: 'Meet your daily goal', check: (p) => p.minutesToday >= p.dailyGoalMinutes && p.dailyGoalMinutes > 0 },
  { id: 'flashcard-fan', name: 'Flashcard Fan', description: 'Review 20 flashcards', check: (p) => (p.flashcardsReviewed || 0) >= 20 },
]

function getOrCreate(userId) {
  if (!progressByUser.has(userId)) {
    progressByUser.set(userId, {
      completedLessonIds: [],
      streak: 0,
      lastPracticeDate: null,
      dailyGoalMinutes: 10,
      minutesToday: 0,
      quizScores: {},
      xp: 0,
      earnedBadgeIds: [],
      flashcardsReviewed: 0,
      flashcardReviews: {}, // cardId -> { nextReview: iso date, ease, interval }
    })
  }
  return progressByUser.get(userId)
}

function recomputeBadges(p) {
  const earned = []
  for (const b of BADGE_DEFS) {
    if (p.earnedBadgeIds.includes(b.id)) {
      earned.push(b)
      continue
    }
    if (b.check(p)) {
      p.earnedBadgeIds.push(b.id)
      earned.push(b)
    }
  }
  return earned
}

export function getProgress(userId) {
  const p = getOrCreate(userId)
  const today = new Date().toDateString()
  if (p.lastPracticeDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    if (p.lastPracticeDate !== yesterday) p.streak = 0
    p.minutesToday = 0
  }
  const badges = recomputeBadges(p)
  const milestones = computeMilestones(p)
  return {
    completedLessonIds: [...p.completedLessonIds],
    streak: p.streak,
    lastPracticeDate: p.lastPracticeDate,
    dailyGoalMinutes: p.dailyGoalMinutes,
    minutesToday: p.minutesToday,
    quizScores: { ...p.quizScores },
    xp: p.xp,
    badges: badges.map((b) => ({ id: b.id, name: b.name, description: b.description })),
    milestones,
  }
}

function computeMilestones(p) {
  const list = []
  const completed = p.completedLessonIds.length
  const quizzesPassed = Object.keys(p.quizScores || {}).length
  if (completed >= 1) list.push({ id: 'first-lesson', title: 'First lesson completed', unlocked: true })
  if (completed >= 5) list.push({ id: 'five-lessons', title: '5 lessons completed', unlocked: true })
  if (completed >= 10) list.push({ id: 'ten-lessons', title: '10 lessons completed', unlocked: true })
  if (quizzesPassed >= 1) list.push({ id: 'first-quiz', title: 'First quiz passed', unlocked: true })
  if (quizzesPassed >= 3) list.push({ id: 'three-quizzes', title: '3 quizzes passed', unlocked: true })
  if (p.streak >= 7) list.push({ id: 'week-streak', title: '7-day streak', unlocked: true })
  if (p.xp >= 100) list.push({ id: 'xp-100', title: '100 XP earned', unlocked: true })
  if (p.xp >= 500) list.push({ id: 'xp-500', title: '500 XP earned', unlocked: true })
  return list
}

export function completeLesson(userId, lessonId) {
  const p = getOrCreate(userId)
  const isNew = !p.completedLessonIds.includes(lessonId)
  if (isNew) {
    p.completedLessonIds.push(lessonId)
    p.xp = (p.xp || 0) + 10
  }
  const today = new Date().toDateString()
  if (p.lastPracticeDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    p.streak = p.lastPracticeDate === yesterday ? p.streak + 1 : 1
    p.lastPracticeDate = today
    p.minutesToday = 0
  }
  p.minutesToday = (p.minutesToday || 0) + 5
}

export function setDailyGoal(userId, minutes) {
  const p = getOrCreate(userId)
  p.dailyGoalMinutes = Math.max(5, Math.min(120, Number(minutes) || 10))
  return p.dailyGoalMinutes
}

export function addMinutesToday(userId, minutes) {
  const p = getOrCreate(userId)
  const today = new Date().toDateString()
  if (p.lastPracticeDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    p.streak = p.lastPracticeDate === yesterday ? p.streak + 1 : 1
    p.lastPracticeDate = today
    p.minutesToday = 0
  }
  const added = Number(minutes) || 0
  p.minutesToday = (p.minutesToday || 0) + added
  p.xp = (p.xp || 0) + Math.min(added, 30) // up to 30 XP per day from practice time
}

export function saveQuizScore(userId, lessonId, score) {
  const p = getOrCreate(userId)
  p.quizScores[lessonId] = score
  const passed = score >= 70
  if (passed) p.xp = (p.xp || 0) + 15
  completeLesson(userId, lessonId)
}

export function recordFlashcardReview(userId, cardId, rating) {
  const p = getOrCreate(userId)
  p.flashcardsReviewed = (p.flashcardsReviewed || 0) + 1
  const xpPerReview = 2
  p.xp = (p.xp || 0) + xpPerReview

  const now = new Date()
  const rev = p.flashcardReviews[cardId] || { ease: 2.5, interval: 0 }
  let nextInterval = rev.interval
  if (rating === 'again') nextInterval = 0
  else if (rating === 'good') nextInterval = rev.interval <= 0 ? 1 : Math.round(rev.interval * rev.ease)
  else if (rating === 'easy') nextInterval = rev.interval <= 0 ? 2 : Math.round(rev.interval * rev.ease * 1.3)
  const nextReview = new Date(now)
  nextReview.setDate(nextReview.getDate() + nextInterval)
  p.flashcardReviews[cardId] = {
    nextReview: nextReview.toISOString(),
    ease: Math.min(3, rev.ease + (rating === 'again' ? -0.2 : 0.1)),
    interval: nextInterval,
  }
  return { nextReview: p.flashcardReviews[cardId].nextReview }
}

export function getFlashcardReviews(userId) {
  const p = getOrCreate(userId)
  return { ...(p.flashcardReviews || {}) }
}
