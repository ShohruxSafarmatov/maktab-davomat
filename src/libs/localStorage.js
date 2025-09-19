const getLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    try {
        return JSON.parse(item);
    } catch {
        return item;
    }
};

const setLocalStorage = (key, value) => {
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const clearLocaleStorage = () => localStorage.clear();
const removeLocalStorage = (key) => localStorage.removeItem(key);

export {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
    clearLocaleStorage,
};