# Todo Streak App

## Overview

Todo Streak App is a React-based application designed to help users track their habits and maintain streaks. It supports both daily and weekly tracking of tasks, offering a flexible UI for managing todos and viewing progress.

## Features

- **Add and Manage Todos:** Easily add, edit, and delete todo items.
- **Tracking Options:** Choose between daily or weekly tracking for each todo.
  - **Daily Tracking:** Schedule specific days for tracking habits.
  - **Weekly Tracking:** Set weekly goals for how many times a habit should be completed.
- **Streak Management:** View and maintain streaks for completed todos.
- **Date Manipulation:** Change the current date to test streak features and backtrack habits.
- **Data Persistence:** Persist data using local storage, with optional syncing to Cloud Firestore.
- **Longest Streak Tracking:** Keep track of the longest streak for each habit.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better code management.
- **Vite**: For fast build tooling.
- **Local Storage**: For data persistence.
- **Tailwind CSS**: For styling the application.
- **Shadcn UI**: For UI components and skeleton loading states.
- **Cloud Firestore**: Optional cloud storage for data syncing.

## Setup and Running the Application

1. **Clone the Repository:**

   ```bash
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
- `src/lib/`: Utility functions for storage and streak calculation
- `src/service/`: Contains service functions for handling data operations and interactions with local storage and Firestore.
