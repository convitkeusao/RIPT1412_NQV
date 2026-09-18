import React from 'react';

import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { Provider } from 'react-redux';

import { store } from './src/app/store';
import WeatherScreen from './src/screens/WeatherScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={
            isDarkMode
              ? 'light-content'
              : 'dark-content'
          }
        />

        <WeatherScreen />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;