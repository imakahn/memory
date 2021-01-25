/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  const colors = ['tomato', 'goldenrod', 'seagreen', 'steelblue'];
  return (
    <>
      <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
        {colors.map((color) =>
          <Pressable
            onPress={() => {
            alert(`color ${color} pressed`);
            }}
            style={({ pressed }) => [
              {
                flex: 1,
                backgroundColor: pressed
                  ? 'white'
                  : color
              },
            ]}
          >
            {({ pressed }) => (
              <>
              </>
            )}
          </Pressable>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
