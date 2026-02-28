# Language Learning Platform — Frontend

React frontend for the Language Learning Platform. Built with React, Tailwind CSS, and ShadCN-style components.

## Tech Stack

- **React** (Vite)
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Router** for routing
- **Context API** for state management

## Folder Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── context/        # React Context (e.g. AuthContext)
├── services/       # API calls
├── hooks/          # Custom hooks (optional)
├── utils/          # Utilities (e.g. cn for classnames)
└── App.jsx
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs at [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

## Environment

Create `.env` and set:

```
VITE_API_URL=http://localhost:3000/api
```

For production, use your deployed backend URL.
