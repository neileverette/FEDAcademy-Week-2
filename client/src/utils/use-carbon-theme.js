import { useState, useEffect } from 'react';
import { useAppConfigContext } from '../components/AppConfig';
import { getLocalStorageValues } from './local-storage';
import { usePrefersDarkScheme } from '@carbon/react';

const themes = ['g10', 'g100'];

const getTheme = (themeSetting, prefersDarkScheme, inverse) => {
  const dark =
    ((!themeSetting || themeSetting === 'default') && prefersDarkScheme) ||
    themeSetting === 'dark';
  return themes[inverse || (!inverse && dark) ? 1 : 0];
};

export const useCarbonTheme = (options) => {
  const inverse = options?.inverse ?? false;
  const { themeSetting: initialThemeSetting } = getLocalStorageValues();
  const initialPrefersDark =
    window.matchMedia('(prefers-color-scheme: dark)')?.matches ?? false;
  const initialTheme = getTheme(
    initialThemeSetting,
    initialPrefersDark,
    inverse,
  );

  const [theme, setTheme] = useState(initialTheme);
  const prefersDarkScheme = usePrefersDarkScheme();
  const appConfig = useAppConfigContext();

  useEffect(() => {
    setTheme(getTheme(appConfig.state.theme, prefersDarkScheme, inverse));
  }, [appConfig.state.theme, inverse, prefersDarkScheme]);

  return theme;
};
