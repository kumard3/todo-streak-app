import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Todo, CompletionHistory } from "@/types";

const LOCAL_STORAGE_KEY = "habits";

const saveToLocalStorage = (data: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const loadFromLocalStorage = (): Todo[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addHabit = async (habit: Todo) => {
  addHabitToLocal(habit);
  if (navigator.onLine) {
    try {
      await Promise.resolve(await addDoc(collection(db, "habits"), habit));
    } catch (e) {
      console.error("Error adding document to Firestore: ", e);
    }
  }
};

export const getHabits = async (): Promise<Todo[]> => {
  // Load from local storage first
  const localHabits = loadFromLocalStorage();

  // Function to fetch from Firestore
  const fetchCloudHabits = async (): Promise<void> => {
    if (navigator.onLine) {
      try {
        const querySnapshot = await getDocs(collection(db, "habits"));
        const cloudHabits = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "Untitled",
          type: doc.data().type || "daily",
          streak: doc.data().streak || 0,
          longestStreak: doc.data().longestStreak || 0,
          scheduledDays: doc.data().scheduledDays || [],
          weeklyGoal:
            doc.data().weeklyGoal !== undefined ? doc.data().weeklyGoal : 1,
        })) as Todo[];
        if (cloudHabits?.length > 0) {
          // Sync local storage with cloud data
          saveToLocalStorage(cloudHabits);
        }
      } catch (e) {
        console.error("Error fetching documents from Firestore: ", e);
      }
    }
  };

  fetchCloudHabits();

  return localHabits;
};

export const updateHabit = async (id: string, updates: Partial<Todo>) => {
  updateHabitInLocal(id, updates);
  if (navigator.onLine) {
    try {
      const habitRef = doc(db, "habits", id);
      await updateDoc(habitRef, updates);
    } catch (e) {
      console.error("Error updating document in Firestore: ", e);
    }
  }
};

export const deleteHabit = async (id: string) => {
  deleteHabitFromLocal(id);
  if (navigator.onLine) {
    try {
      const habitRef = doc(db, "habits", id);
      await deleteDoc(habitRef);
    } catch (e) {
      console.error("Error deleting document from Firestore: ", e);
    }
  }
};

export const calculateStreak = (
  todo: Todo,
  completionHistory: CompletionHistory,
  currentDate: Date
): number => {
  let streak = 0;
  const date = new Date(currentDate);
  const history = completionHistory[todo.id] || {};

  if (todo.type === "daily") {
    while (history[date.toISOString().split("T")[0]]) {
      if (todo.scheduledDays && todo.scheduledDays.length > 0) {
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        if (todo.scheduledDays.includes(dayName)) {
          streak++;
        }
      } else {
        streak++;
      }
      date.setDate(date.getDate() - 1);
    }
  } else if (todo.type === "weekly") {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());

    while (true) {
      const weekCompletions = Array(7)
        .fill(null)
        .map((_, i) => {
          const day = new Date(weekStart);
          day.setDate(weekStart.getDate() + i);
          return history[day.toISOString().split("T")[0]] ? 1 : 0;
        })
        .reduce((a: number, b: number) => a + b, 0);

      if (weekCompletions >= (todo.weeklyGoal || 1)) {
        streak++;
        weekStart.setDate(weekStart.getDate() - 7);
      } else {
        break;
      }
    }
  }

  return streak;
};

// Local storage operations
const addHabitToLocal = (habit: Todo) => {
  const habits = loadFromLocalStorage();
  habits.push(habit);
  saveToLocalStorage(habits);
};

const updateHabitInLocal = (id: string, updates: Partial<Todo>) => {
  const habits = loadFromLocalStorage();
  const index = habits.findIndex((habit) => habit.id === id);
  if (index !== -1) {
    habits[index] = { ...habits[index], ...updates };
    saveToLocalStorage(habits);
  }
};

const deleteHabitFromLocal = (id: string) => {
  const habits = loadFromLocalStorage();
  const updatedHabits = habits.filter((habit) => habit.id !== id);
  saveToLocalStorage(updatedHabits);
};
