import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';

import { ThemeProvider, useTheme } from './theme.context';

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
});

export default function App() {
  return (
    <SafeAreaView>
      <ThemeProvider>
        <View style={styles.container}>
          <View style={styles.cardImageContainer}>
            <ThemedCardImage cardId="2C" />
            <ThemedCardImage cardId="2D" />
            <ThemedCardImage cardId="2H" />
            <ThemedCardImage cardId="2S" />
          </View>

          <View style={styles.colorsTextContainer}>
            <Text style={styles.heading}>Colors</Text>
            <ThemedTextColorBox colorId="primary" />
            <ThemedTextColorBox colorId="secondary" />
          </View>
        </View>
      </ThemeProvider>
    </SafeAreaView>
  );
}

function ThemedCardImage({ cardId }) {
  const theme = useTheme();
  return <Image source={theme[cardId]} style={styles.cardImage} />;
}

function ThemedTextColorBox({ colorId }) {
  const theme = useTheme();

  return (
    <View style={styles.textContainer}>
      <Text style={{ textTransform: 'capitalize' }}>
        {colorId} Color: {theme.primary}
      </Text>
      <View
        style={[
          styles.themeView,
          {
            backgroundColor: theme.primary,
          },
        ]}
      />
    </View>
  );
}
