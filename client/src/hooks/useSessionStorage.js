import { useState, useEffect } from 'react';

export const useSessionStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    useEffect(() => {
        const item = JSON.stringify(value);
        window.sessionStorage.setItem(key, item);
    }, [value]);

    return [value, setValue];
};