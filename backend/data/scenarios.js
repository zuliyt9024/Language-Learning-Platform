export const scenarios = [
  {
    id: 'restaurant',
    title: 'Ordering at a Restaurant',
    description: 'Practice ordering food and drinks in Spanish.',
    situation: 'You are at a restaurant in Madrid. The waiter has brought the menu.',
    imageUrl: 'https://images.unsplash.com/photo-1414237427421-fb899b27e651?w=600&q=80',
    steps: [
      { prompt: 'Waiter: Buenos días. ¿Qué van a tomar?', response: 'You: Quisiera un café con leche, por favor.', hint: 'Say you would like a coffee with milk.' },
      { prompt: 'Waiter: ¿Desean algo para comer?', response: 'You: Sí, estoy listo para ordenar.', hint: 'Say you\'re ready to order: "Estoy listo para ordenar."' },
      { prompt: 'Waiter: ¿Qué me recomienda?', response: 'You: ¿Qué me recomienda? (You ask for a recommendation.)', hint: 'Ask for a recommendation.' },
      { prompt: 'After the meal: You want the check.', response: 'You: La cuenta, por favor.', hint: 'The check, please.' },
    ],
  },
  {
    id: 'travel',
    title: 'Asking for Directions',
    description: 'Get help finding your way in a Spanish-speaking city.',
    situation: 'You are lost and need to find the train station.',
    imageUrl: 'https://images.unsplash.com/photo-1488646959014-31a70036c25b?w=600&q=80',
    steps: [
      { prompt: 'You need to ask where something is.', response: 'You: ¿Dónde está la estación de tren?', hint: 'Where is the train station?' },
      { prompt: 'They answer but you don\'t understand.', response: 'You: No entiendo. ¿Puede repetir?', hint: 'I don\'t understand. Can you repeat?' },
      { prompt: 'You need a taxi.', response: 'You: Necesito un taxi.', hint: 'I need a taxi.' },
      { prompt: 'You want to know the price.', response: 'You: ¿Cuánto cuesta?', hint: 'How much does it cost?' },
    ],
  },
  {
    id: 'meeting',
    title: 'Meeting Someone New',
    description: 'Introduce yourself and make small talk.',
    situation: 'You are at a language exchange event and someone says Hola.',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80',
    steps: [
      { prompt: 'They say: Hola, ¿cómo te llamas?', response: 'You: Me llamo [your name]. ¿Y tú?', hint: 'Say your name and ask theirs.' },
      { prompt: 'They say: Mucho gusto.', response: 'You: Mucho gusto. Igualmente.', hint: 'Nice to meet you. Likewise.' },
      { prompt: 'They ask: ¿Hablas español?', response: 'You: Un poco. Estoy aprendiendo.', hint: 'A little. I\'m learning.' },
      { prompt: 'You want to be polite.', response: 'You: Gracias. Por favor.', hint: 'Thank you. Please.' },
    ],
  },
]
