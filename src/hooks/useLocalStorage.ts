import { useState, useEffect } from "react";

/**
 * Custom hook for managing state in local storage.
 *
 * @template T - The type of the value stored in local storage.
 * @param {string} key - The key used to store the value in local storage.
 * @param {T} initialValue - The initial value to be stored in local storage.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} - A tuple containing the stored value and a function to update the stored value.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
