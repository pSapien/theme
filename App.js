import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Button, Alert } from 'react-native';

import { useTheme, useUpdaterTheme, getDefaultTheme } from './theme.context';
import { loadTheme, downloadTheme } from './theme.downloader';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  cardImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
  },
  cardImage: {
    width: 64,
    height: 90,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'underline',
  },
  colorsTextContainer: {
    height: '15%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
  },
  themeView: {
    height: '100%',
    width: 20,
    marginLeft: 10,
  },
  themeSelectionContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-around',
  },
  selectedTheme: {
    textAlign: 'center',
    fontSize: 20,
  },
});

const THEME_FOLDER_NAME = 'bollywood';
const THEME_DOWNLOAD_LINK =
  'https://dl.dropboxusercontent.com/s/oelo0iwtc0btsg1/bollywood.zip?dl=0';

export default function App() {
  const setTheme = useUpdaterTheme();
  const themeRef = useRef('Normal');

  async function downloadAndUpdateTheme() {
    await downloadTheme(THEME_DOWNLOAD_LINK);
    const newTheme = await loadTheme(THEME_FOLDER_NAME);
    themeRef.current = 'Bollywood';
    setTheme(newTheme);
    Alert.alert('Theme has been changed to bollywood');
  }

  function applyDefaultTheme() {
    setTheme(getDefaultTheme());
    Alert.alert('Theme has been changed to default');
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.cardImageContainer}>
          <ThemedCardImage cardId="2C" />
          <ThemedCardImage cardId="2D" />
          <ThemedCardImage cardId="2H" />
          <ThemedCardImage cardId="2S" />
        </View>

        <Text style={styles.selectedTheme}>Selected Theme: {themeRef.current}</Text>

        <View style={styles.colorsTextContainer}>
          <Text style={styles.heading}>Colors</Text>
          <ThemedTextColorBox colorId="primary" />
          <ThemedTextColorBox colorId="secondary" />
        </View>

        <View style={styles.themeSelectionContainer}>
          <Text style={styles.heading}>Theme Selection</Text>
          <View style={styles.buttons}>
            <Button title="Normal" onPress={applyDefaultTheme} />
            <Button title="Bollywood" onPress={downloadAndUpdateTheme} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function ThemedCardImage({ cardId }) {
  const theme = useTheme();
  const image = typeof theme[cardId] === 'string' ? { uri: theme[cardId] } : theme[cardId];

  return <Image source={image} style={styles.cardImage} />;
}

function ThemedTextColorBox({ colorId }) {
  const theme = useTheme();
  const color = theme[colorId];

  return (
    <View style={styles.textContainer}>
      <Text style={{ textTransform: 'capitalize' }}>
        {colorId} Color: {color}
      </Text>
      <View
        style={[
          styles.themeView,
          {
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}
