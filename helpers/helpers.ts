export const getLocalStorageState = (key: string) => {
  try {
    return JSON.parse(<string>localStorage.getItem(key));
  } catch (e) {
    return null;
  }
};
