import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();  

  const addition = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum.toString());
    setNum1("");
    setNum2("");
    setHistory(history => [...history, `${num1} + ${num2} = ${sum}`]);
  }

  const subtraction = () => {
    const substract = parseFloat(num1) - parseFloat(num2);
    setResult(substract.toString());
    setNum1("");
    setNum2("");
    setHistory(history => [...history, `${num1} - ${num2} = ${substract}`]);
  }

  const navigateHistory = () => {
    navigation.navigate('History', { history });
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, marginTop: 30, marginBottom: 20}}>Calculator</Text>

      <Text style={{ fontSize: 25, marginTop: 25}}>Result: {result}</Text>
        <TextInput
          style={styles.input}
          keyboardType = "numeric"
          value={num1}
          onChangeText={setNum1}
        />
        <TextInput 
          style={styles.input}
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
          <Button
            title="History"
            onPress={navigateHistory}
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
  },
  input: {
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    width: 200
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "35%",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%'
  },
  historyText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  }
});
