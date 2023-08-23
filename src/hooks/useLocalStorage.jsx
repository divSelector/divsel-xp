import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    let storedValue = localStorage.getItem(key);

    if (storedValue === null) {
        storedValue = JSON.stringify(initialValue);
        localStorage.setItem(key, storedValue);
    }

    const [value, setValue] = useState(JSON.parse(storedValue));

    const updateValue = newValue => {
        setValue(JSON.parse(newValue));
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, updateValue];
};

export default useLocalStorage;