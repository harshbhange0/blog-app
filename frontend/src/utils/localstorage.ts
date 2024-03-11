export const setItemToLocalStorage = async (key: string, data: string) => {
  if (!key) {
    console.error("provide key to set local storage");
  }
  if (!data) {
    console.error("provide key to set local storage");
  }
  return await localStorage.setItem(key, data);
};
// export const getItemFromLocalStorage = (key: string) => {
//   if (!key) {
//     console.error("provide key to set local storage");
//   }
//   const data = localStorage.getItem(key);
//   return data;
// };
export const removeFromLocalStorage = (key: string) => {
  if (!key) {
    console.error("provide key to set local storage");
  }
  return localStorage.removeItem(key);
};
