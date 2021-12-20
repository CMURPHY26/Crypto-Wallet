export const handleItemInLocalStorage = (func, key) => {
  try {
    if (key in localStorage) {
      func(JSON.parse(localStorage.getItem(key)));
    }
  } catch (e) {
    console.log(e);
  }
};

export const setItemInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};
