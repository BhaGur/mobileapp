import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('grocerydb.db');

export default function App() {
  const [grocery, setGrocery] = useState('');
  const [amount, setAmount] = useState('');
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists product (id integer primary key not null, grocery text, amount text);');
    }, null, updateList); 
  }, []);

  // Save grocery
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into product (grocery, amount) values (?, ?);', [grocery, amount]);    
      }, null, updateList
    );
    setGrocery('');
    setAmount('')
  }

  // Update grocery list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from product;', [], (_, { rows }) =>
        setGroceries(rows._array)
      ); 
    });
  }

  // Delete grocery
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from product where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Grocery' 
        style={{
          marginTop: 30, 
          fontSize: 18, 
          width: 200, 
          borderColor: 'gray', 
          borderWidth: 1
        }}
        onChangeText={(grocery) => setGrocery(grocery)}
        value={grocery}
      />  
      <TextInput 
        placeholder='Amount' 
        style={{
          marginTop: 5, 
          marginBottom: 5, 
          fontSize:18, 
          width: 200, 
          borderColor: 'gray', 
          borderWidth: 1
        }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />      
      <Button onPress={saveItem} title="Save" /> 
      <Text style={{marginTop: 30, fontSize: 20}}>Shopping List</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
        <View style={styles.listcontainer}>
          <Text style={{fontSize: 18}}>{item.grocery}, {item.amount}</Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> bought </Text>
        </View>} 
        data={groceries} 
        ItemSeparatorComponent={listSeparator} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  marginTop: 50,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});