export const cacheState = key => state => localStorage.setItem(key, JSON.stringify(state));
export const parseCachedState = key => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
