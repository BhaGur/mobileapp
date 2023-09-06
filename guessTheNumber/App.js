import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [text, setText] = useState("Guess a number between 1-100");
  const [guess, setGuess] = useState('');
  const[count, setCount] = useState(1);
  const [rndnum, setRndnum] = useState(0);

  useEffect(() => resetGame(), [])
  const resetGame = () => {
    setRndnum(Math.floor(Math.random() * 100) + 1);
    setText("Guess a number between 1-100");
    setCount(1);
    setGuess('');
  }

  const makeGuess = () => {
    const num = parseInt(guess);
    
    if (isNaN(num)) {
      Alert.alert('Please enter a valid number.');
    }else{
      setCount(count + 1);
      if(num < rndnum){
        setText('Your guess is too low.');
      } else if (num > rndnum) {
        setText('Your guess is too high.');
      } else {
        Alert.alert(`You guessed the number in ${count} guesses.`);
      }
    }
    setGuess('');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>{text}</Text>
      <TextInput
        style={{fontSize: 20, width: 50, backgroundColor: 'white', borderWidth: 1, margin: 20}}
        onChangeText={guess => setGuess(guess)}
        value={guess}
        keyboardType="numeric"
      />
      <Button title="Make Guess" onPress={makeGuess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});