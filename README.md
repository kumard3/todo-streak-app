# Todo Streak App

## Overview

Todo Streak App is a React-based application that helps users track their habits and maintain streaks. It allows for both daily and weekly tracking of tasks, with a flexible UI for managing todos and viewing progress.

## Features

- Add and manage todo items
- Choose between daily or weekly tracking for each todo
- Schedule specific days for daily todos
- Set weekly goals for weekly todos
- View and maintain streaks for completed todos
- Change the current date for testing and back-tracking
- Persist data using local storage

## Technologies Used

- React
- TypeScript
- Vite (for build tooling)
- Local Storage for data persistence

## Setup and Running the Application

1. Clone the repository:
   ```
   git clone https://github.com/kumard3/todo-streak-app.git
   cd todo-streak-app
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Start the development server:
   ```
   pnpm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (typically `http://localhost:5173`) to view the app.

## Building for Production

To create a production build:

1. Run the build command:
   ```
   pnpm run build
   ```

2. The built files will be in the `dist` directory. You can serve these files with any static file server.

3. To preview the production build locally:
   ```
   pnpm run preview
   ```

## Project Structure

- `src/App.tsx`: Main component that manages the overall state and renders child components
- `src/components/`: Contains individual components (TodoList, TodoForm, DateSelector)
- `src/types.ts`: TypeScript interfaces for the application
- `src/utils/`: Utility functions for storage and streak calculation