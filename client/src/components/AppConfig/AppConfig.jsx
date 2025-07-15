import PropTypes from 'prop-types';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useMatchMedia } from '../../utils/use-match-media';
import { apiGetTheme, apiPutTheme } from '../../utils/api-calls';
import {
  getLocalStorageValues,
  setLocalStorageValues,
} from '../../utils/local-storage';

const AppConfigContext = createContext();
const localStorage = getLocalStorageValues();
const defaultState = {
  theme: localStorage.themeSetting,
  themeSetting: 'default',
};
document.body.setAttribute('data-bs-theme', defaultState.theme);

const appConfigReducer = (state, action) => {
  const theme = action?.theme ?? state.theme;
  const themeSetting = action?.themeSetting ?? state.themeSetting;

  return { theme, themeSetting }; // default (setting only), light, dark
};

/* maintains theme and themeSetting states 
  - theme can only be 'light' or 'dark'
  - theme setting can be 'light', 'dark', or 'default' based on user preferences
*/
export const AppConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appConfigReducer, { ...defaultState });
  const isDark = useMatchMedia('(prefers-color-scheme: dark)');

  const setTheme = useCallback(
    (newTheme) => {
      let themeSetting = newTheme;
      let theme = newTheme;

      if (!(themeSetting === 'light' || themeSetting === 'dark')) {
        themeSetting = 'default';
        theme = isDark ? 'dark' : 'light';
        document.body.removeAttribute('data-user-theme');
      } else {
        document.body.setAttribute('data-user-theme', themeSetting);
      }
      document.body.setAttribute('data-bs-theme', theme);
      setLocalStorageValues({ themeSetting: theme });

      dispatch({ theme, themeSetting });
      apiPutTheme({ theme: themeSetting });
    },
    [isDark],
  );

  const doFetchTheme = useCallback(async () => {
    const storedThemeSetting = await apiGetTheme();

    setTheme(storedThemeSetting.theme);
  }, [setTheme]);

  useEffect(() => {
    const userSelectedTheme = document.body.getAttribute('data-user-theme');

    if (!userSelectedTheme) {
      doFetchTheme();
    } else {
      setTheme(userSelectedTheme);
    }
  }, [doFetchTheme, setTheme]);

  return (
    <AppConfigContext.Provider
      value={{
        state,
        setTheme,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

AppConfigProvider.propTypes = {
  children: PropTypes.node,
};

export const useAppConfigContext = () => {
  return useContext(AppConfigContext);
};
