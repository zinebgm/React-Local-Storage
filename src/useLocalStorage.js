import { useState, useEffect } from "react";

const registrations = new Map();

function notifyRegistrants(key) {
  if (registrations.has(key)) {
    registrations.get(key).forEach((callback) => callback());
  }
}

function useLocalStorage(key, initialValue) {
  const [savedValue, setSavedValue] = useState(() => {
    try{
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;  
    } catch (error) {
      console.warn('Error reading localStorage key: ', key, error);
      return initialValue;
    }    
    });

  useEffect(() => {
    const callback = () => {
      try {
        const item = window.localStorage.getItem(key);
        setSavedValue(item ? JSON.parse(item) : initialValue);
        } catch (error) {
          console.warn('Error parsing localStorage key: ', error);
        }
    };

    /*if(!registrations.has(key)){
      registrations.set(key, []);
    }
    registrations.get(key).push(callback);*/

    registrations.set(key, [...(registrations.get(key) || []), callback]);

   /* return () => {
      registrations.set(
        key,
        registrations.get(key).filter((cb) => cb !== callback)
      );
    };*/

    return () => {
      const callbacks = registrations.get(key) || [];
      registrations.set(key, callbacks.filter((cb) => cb !== callback));
    };
    
    
    }, [key, initialValue]);

    const setValue = (value) => {
      try {
        const valueToSave = typeof value === 'function' ? value(savedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToSave));
        setSavedValue(valueToSave);
        notifyRegistrants(key);
      } catch (error) {
        console.warn('Error setting localStorage key: ', key, error);
      }
    };
  
 return [savedValue, setValue];
 }

 window.addEventListener('saving', (event) => {
  if (event.key && registrations.has(event.key)) {
    notifyRegistrants(event.key)
  }
 });

 export default useLocalStorage;
