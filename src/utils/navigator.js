// src/utils/navigator.js
let navigateFunction;

export const setNavigate = (navigate) => {
  navigateFunction = navigate;
};

export const goTo = (path, options = {}) => {
  if (navigateFunction) {
    navigateFunction(path, options);
  } else {
    console.error('Navigation function not set!');
  }
};
