import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);


  const addition = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum.toString());
    setNum1("");
    setNum2("");
    setHistory(prevHistory => [...prevHistory, `${num1} + ${num2} = ${sum}`]);
  }

  const subtraction = () => {
    const substract = parseFloat(num1) - parseFloat(num2);
    setResult(substract.toString());
    setNum1("");
    setNum2("");
    setHistory(prevHistory => [...prevHistory, `${num1} - ${num2} = ${substract}`]);
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, marginTop: 30, marginBottom: 20}}>Calculator</Text>

      <Text style={{ fontSize: 25, marginTop: 25}}>Result: {result}</Text>
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
        <Text style={styles.historyText}>History</Text>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({ item }) => <Text style={{fontSize: 20}}>{item}</Text>}
        />
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
    justifyContent: 'space-between',
    width: "15%",
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
