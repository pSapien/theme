import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';

import { theme } from './assets';

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
      <View style={styles.container}>
        <View style={styles.cardImageContainer}>
          <CardImage cardId="2C" />
          <CardImage cardId="2D" />
          <CardImage cardId="2H" />
          <CardImage cardId="2S" />
        </View>

        <View style={styles.colorsTextContainer}>
          <Text style={styles.heading}>Colors</Text>
          <TextColorBox colorId="primary" />
          <TextColorBox colorId="secondary" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function CardImage({ cardId }) {
  return <Image source={theme[cardId]} style={styles.cardImage} />;
}

function TextColorBox({ colorId }) {
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
