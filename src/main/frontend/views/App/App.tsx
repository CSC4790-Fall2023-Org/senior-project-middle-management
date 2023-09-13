import React from 'react';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const App: () => React.ReactNode = () => {
  return (
    <View style={styles.container}>
      <Text>Start working on app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;