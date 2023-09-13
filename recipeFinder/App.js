import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, Alert, Button, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [recipe, setRecipe] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const fetchRecipes = () => {
    setIsVisible(true)
    fetch(process.env.EXPO_PUBLIC_API_URL+'?i=' + keyword)
    .then(response => response.json())
    .then(data => { 
      setRecipe(data.meals);
      setIsVisible(false);
    })
    .catch(err => {
      setIsVisible(false);
      Alert.alert("Error", "Something went wrong");
    });
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={isVisible} size="large" />
        <FlatList 
          data={recipe}
          renderItem={({item}) => 
            <View>
              <Text style={{ fontSize:18, fontWeight: "bold"}}>{item.strMeal}</Text>
              <Image style={{width: 150, height: 50}} source={{uri: `${item.strMealThumb}`}}/>
            </View>
          }
        />
        <TextInput
          value={keyword}
          onChangeText={text => setKeyword(text)}
          placeholder='Keyword'
        />
        <Button title="Find" onPress={fetchRecipes} /> 
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
