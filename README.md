# Recipe Book

<div align="center">
<i>
   A full-stack web application that allows users to browse, search and explore recipes from around the world.
</i>
  <img src="https://github.com/user-attachments/assets/deb301a5-96a5-40de-a8e7-9bdef26a2b7f" alt="Recipe Book App" width="600">
</div>

## Features

- Browse recipes by cuisine, category, or ingredient
- Search for recipes by ingredient
- View detailed recipe information including instructions and ingredients
- Responsive design that works on desktop and mobile devices
- Related recipes suggestions

## Technology Stack

### Frontend
- React 19
- TypeScript
- React Router
- CSS with custom variables for theming

### Backend
- Node.js
- Express
- TypeScript
- TheMealDB API integration

## Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/Recipe-book.git
cd Recipe-book
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
# From the backend directory
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
# From the frontend directory
npm run dev
```

3. Open your browser and navigate to:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Production Mode

1. Build both the frontend and backend:
```bash
# Build backend
cd backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

2. Start the backend server:
```bash
# From the backend directory
npm start
```

3. Serve the frontend build using a static file server like `serve`:
```bash
npm install -g serve
cd ../frontend/dist
serve -s
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /recipes` - Get all recipes or filter by ingredient, area, or category
  - Query parameters: `ingredient`, `area`, `category`
- `GET /recipes/:id` - Get detailed information about a specific recipe
- `GET /filters/areas` - Get list of all available cuisine areas
- `GET /filters/categories` - Get list of all available recipe categories

## Project Structure

```
Recipe-book/
├── backend/
│   ├── src/
│   │   ├── index.ts             # Server entry point
│   │   ├── routes/              # API routes
│   │   └── types/               # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/                  # Static files
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── styles/              # CSS styles
│   │   ├── types/               # TypeScript types
│   │   ├── App.tsx              # Main App component
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Common Issues and Troubleshooting

- **CORS errors**: Make sure the backend server is running before starting the frontend
- **API not responding**: Check if the `.env` file is correctly set up with API_BASE_URL
- **Module not found errors**: Run `npm install` in both directories to ensure all dependencies are installed

## Future Improvements

- User authentication and personalized recipe collections
- Save favorite recipes
- Add rating system
- Allow users to add their own recipes
- Implement advanced search with multiple filters
