/*
 * Wait until the function has not been called for a period of delay to execute.
 */
const debounce = (func: () => any, delay: number) => {
  let inDebounce: any;
  return () => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(), delay);
  }
};

export {debounce};
