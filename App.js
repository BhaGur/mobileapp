import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [text, setText] = useState("");

  const buttonPressed = () => {
    Alert.alert('Hello', 'You typed: ' + text);
  }

  return (
    <View style={styles.container}>
      <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
      onChangeText={text => setText(text)} value={text} />
      <Button title='Press me' onPress={buttonPressed}></Button>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
