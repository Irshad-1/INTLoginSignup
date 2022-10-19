/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Login} from './Components/Login';
import {NavigationContainer} from '@react-navigation/native';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <NavigationContainer>
      <ScrollView>
        <Text style={styles.heading}>INT Login SignUp</Text>
        <Login />
      </ScrollView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF8787',
    fontFamily: 'Roboto',
  },
});

export default App;
