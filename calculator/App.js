import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

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
    <View style={styles.container}>
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
      <View style={styles.buttonContainer}>
        <Button 
          title="+"
          onPress={addition}
        />
        <Button 
          title="-"
          onPress={subtraction}
        />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  
});
