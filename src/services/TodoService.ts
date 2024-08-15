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
  console.log(navigator.onLine);
  console.log(habit);
  if (navigator.onLine) {
    try {
      await addDoc(collection(db, "habits"), habit);
    } catch (e) {
      console.error("Error adding document: ", e);
      const localData = loadFromLocalStorage();
      localData.push(habit);
      saveToLocalStorage(localData);
    }
  } else {
    const localData = loadFromLocalStorage();
    localData.push(habit);
    saveToLocalStorage(localData);
  }
};

export const getHabits = async (): Promise<Todo[]> => {
  if (navigator.onLine) {
    try {
      const querySnapshot = await getDocs(collection(db, "habits"));
      const habits = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "Untitled",
          type: data.type || "daily",
          streak: data.streak || 0,
          longestStreak: data.longestStreak || 0,
          scheduledDays: data.scheduledDays || [],
          weeklyGoal: data.weeklyGoal || 1,
        } as Todo;
      });
      saveToLocalStorage(habits); // Sync local storage with cloud
      return habits;
    } catch (e) {
      console.error("Error fetching documents: ", e);
      return loadFromLocalStorage();
    }
  } else {
    return loadFromLocalStorage();
  }
};

/**
 * Updates a habit with the specified ID.
 * If the device is online, the habit will be updated in the database.
 * If the device is offline, the habit will be updated in the local storage.
 *
 * @param {string} id - The ID of the habit to update.
 * @param {Partial<Todo>} updates - The updates to apply to the habit.
 * @returns {Promise<void>} - A promise that resolves when the habit is updated.
 */
export const updateHabit = async (
  id: string,
  updates: Partial<Todo>
): Promise<void> => {
  if (navigator.onLine) {
    try {
      const habitRef = doc(db, "habits", id);
      await updateDoc(habitRef, updates);
    } catch (e) {
      console.error("Error updating document: ", e);
      const localData = loadFromLocalStorage();
      const index = localData.findIndex((habit) => habit.id === id);
      if (index !== -1) {
        localData[index] = { ...localData[index], ...updates };
        saveToLocalStorage(localData);
      }
    }
  } else {
    const localData = loadFromLocalStorage();
    const index = localData.findIndex((habit) => habit.id === id);
    if (index !== -1) {
      localData[index] = { ...localData[index], ...updates };
      saveToLocalStorage(localData);
    }
  }
};

/**
 * Deletes a habit by its ID.
 * If the device is online, the habit is deleted from the database.
 * If the device is offline, the habit is deleted from the local storage.
 *
 * @param {string} id - The ID of the habit to delete.
 * @returns {Promise<void>} - A promise that resolves when the habit is deleted.
 */
export const deleteHabit = async (id: string): Promise<void> => {
  if (navigator.onLine) {
    try {
      const habitRef = doc(db, "habits", id);
      await deleteDoc(habitRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
      const localData = loadFromLocalStorage();
      const updatedData = localData.filter((habit) => habit.id !== id);
      saveToLocalStorage(updatedData);
    }
  } else {
    const localData = loadFromLocalStorage();
    const updatedData = localData.filter((habit) => habit.id !== id);
    saveToLocalStorage(updatedData);
  }
};

/**
 * Calculates the streak of completing a todo based on the provided completion history and current date.
 * @param todo - The todo object.
 * @param completionHistory - The completion history object.
 * @param currentDate - The current date.
 * @returns The streak of completing the todo.
 */
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
