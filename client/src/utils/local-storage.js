const localStorageKeys = {
  themeSetting: 'academy-app-theme-setting',
};

export const getLocalStorageValues = () => {
  const themeSetting =
    window.localStorage.getItem(localStorageKeys.themeSetting) || 'system';

  return {
    themeSetting,
  };
};

export const setLocalStorageValues = (values) => {
  if (values) {
    const keys = Object.keys(localStorageKeys);

    keys.forEach((key) => {
      const value = values[key];
      // save boolean as string
      const processedValue =
        typeof value !== 'boolean' ? value : value ? 'true' : 'false';

      if (processedValue) {
        window.localStorage.setItem(localStorageKeys[key], processedValue);
      }
    });
  }
};
