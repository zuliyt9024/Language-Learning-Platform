// Unsplash direct image URLs - format: photo-{id}?w=width&q=80 (no fit=crop for max compatibility)
const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80`

// Verified working Unsplash photo IDs (education, books, study, goals, travel)
export const IMAGES = {
  hero: U('1523240795612-9a054b0db644', 1920),
  lessons: U('1546410531-bb4caa6b424d', 800),
  goals: U('1503676260728-1c00da094a0b', 800),
  progress: U('1522202176988-66273c2fd55f', 800),
  flashcards: U('1516979187457-637ebb4acd56', 800),
  quiz: U('1434030216411-0b793f4b4173', 800),
  travel: U('1488646959014-31a70036c25b', 800),
  study: U('1456513080510-7bf3a84c82f8', 800),
  defaultLesson: U('1546410531-bb4caa6b424d', 600),
}

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
export const CATEGORIES = ['Vocabulary', 'Grammar', 'Conversation', 'Idioms']
