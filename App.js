import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const addition = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum.toString());
  }

  const subtraction = () => {
    const substract = parseFloat(num1) - parseFloat(num2);
    setResult(substract.toString());
  }

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      {result !== "" && <Text style={{ fontSize: 25, marginTop: 25}}>Result: {result}</Text>}
      <TextInput
        style={{borderWidth: 1, padding: 10, marginBottom: 10, width: 200}}
        keyboardType = "numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput 
        style={{borderWidth: 1, padding: 10, marginBottom: 10, width: 200}}
        keyboardType = "numeric"
        value={num2}
        onChangeText={setNum2}
      />
      <Button 
        title="+"
        onPress={addition}
      />
      <Button 
        title="-"
        onPress={subtraction}
      />
    </View>
  );
}

