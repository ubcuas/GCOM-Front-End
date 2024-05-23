import { useState, useEffect } from "react";

export function getStorageValue<T>(key: string, defaultValue: T): T {
    // getting stored value
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
    return defaultValue;
}

export function setStorageValue<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
