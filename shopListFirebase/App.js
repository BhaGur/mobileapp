import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, remove, set, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: "https://shoppinglist-e8b68-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-e8b68",
  storageBucket: "shoppinglist-e8b68.appspot.com",
  messagingSenderId: "744739945155",
  appId: "1:744739945155:web:76cf5043caf8f7d7f74076"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'items/'),(snapshot) => {
     const data = snapshot.val();
     const items = [];
     for (let id in data) {
      items.push({id, ...data[id]});
     } 
     setProducts(items);
    });
  }, []);

  const saveProduct = () => {
    const firstRef= push(ref(db, 'items/'));
    set(firstRef, {
      product,
      amount,
    });
    setProduct('');
    setAmount('');
  }

  const removeProduct = (id) => {
    remove(ref(db, `items/${id}`));
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Product'
        value = {product}
        onChangeText={setProduct}
      />
      <TextInput
        placeholder='Amount'
        value = {amount}
        onChangeText={setAmount}
      />    
      <Button title='Save' onPress={saveProduct} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) =>(
          <View style={styles.list}>  
            <Text style={{fontSize: 18}}>{item.product}  {item.amount}</Text>
            <Text style={{fontSize: 15, color: '#0000ff'}} onPress={() => removeProduct(item.id)}> Bought</Text>
          </View>
        )} 
      />
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
  list: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

