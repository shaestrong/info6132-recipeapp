import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Chip, Avatar, Button } from 'react-native-paper';
import { categoryPastelColors, categoryIcons, darkenedColor } from '../../includes/variables';


const RecipeListView = ({ navigation, recipes }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  useEffect(() => {
    setRecipeData(recipes);
  }, [recipes]);

  const renderItem = ({ item }) => {

    const capitalizedCategory = item.category.charAt(0).toUpperCase() + item.category.slice(1);

    return (
      <View style={styles.recipeItem}>
        <View style={styles.recipeHeader}>
          <Text style={styles.recipeName}>{item.name}</Text>

          <Chip
            style={{ backgroundColor: categoryPastelColors[capitalizedCategory.toLowerCase()], width: 120, height:32 }}
            avatar={<Avatar.Icon
              size={38}
              icon={categoryIcons[capitalizedCategory.toLowerCase()]}
              color={darkenedColor[capitalizedCategory.toLowerCase()]}
              style={{ backgroundColor: categoryPastelColors[capitalizedCategory.toLowerCase()] }}
            />}
          >
            {capitalizedCategory}
          </Chip>
        </View>
        <Button
          onPress={() => navigation.navigate('RecipeDetailView', { item })}
          style={styles.button}
          mode="outlined"
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
        >
          View Recipe
        </Button>


      </View>
    );
  };

  return (
    <FlatList
      data={recipeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  recipeItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom:5,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  recipeHeader: {
    flexDirection:'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2,
    paddingRight:8
  },
  recipeContent: {
    paddingVertical: 10,
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 90,
    borderColor: "#18AB91",
  }
});


export default RecipeListView;
