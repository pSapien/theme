import React, { createContext, useContext, useState } from 'react';
import { theme } from './assets';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [loadedTheme, setLoadedTheme] = useState(theme);

  return (
    <ThemeContext.Provider value={{ theme: loadedTheme, setTheme: setLoadedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) throw new Error('Did you wrap your component with ThemeProvider');
  return ctx.theme;
}

export function useUpdaterTheme() {
  const ctx = useContext(ThemeContext);

  if (ctx === null) throw new Error('Did you wrap your component with ThemeProvider');

  return ctx.setTheme;
}
