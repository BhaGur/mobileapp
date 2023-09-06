import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const addItem = () => {
    setData([...data, text]);
    setText("");
  }

  const clearItem = () => {
    setData([]);
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style = {{width: 200, borderColor:"gray", borderWidth: 1, marginBottom: 20}}
        onChangeText={text => setText(text)}
        value={text}
      />
      <View style = {styles.buttonContainer}>
        <Button title='Add' onPress={addItem} />
        <Button title='Clear' onPress={clearItem} />
      </View>
      <FlatList 
        ListHeaderComponent={<Text style={{fontSize: 20, color:"blue", marginTop: 20}}>Shopping list</Text>}
        data ={data}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  }
});
