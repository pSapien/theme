import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { ThemeProvider } from './theme.context';

AppRegistry.registerComponent(appName, () => Main);

function Main() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
