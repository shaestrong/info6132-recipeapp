import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Sample recipe data
const recipes = [
  { id: '1', name: 'Recipe 1', amount: 10, description: 'Description for Recipe 1' },
  { id: '2', name: 'Recipe 2', amount: 20, description: 'Description for Recipe 2' },
  { id: '3', name: 'Recipe 3', amount: 30, description: 'Description for Recipe 3' },
];

export default function RecipeListView({ navigation }) {
  const [recipeData, setRecipeData] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  useEffect(() => {
    setRecipeData(recipes);
  }, []);

  const toggleRecipeExpansion = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.recipeItem}>
      <TouchableOpacity
        onPress={() => toggleRecipeExpansion(item.id)}
        style={styles.recipeHeader}
      >
        <Text style={styles.recipeName}>{item.name}</Text>
        <MaterialIcons
          name={expandedRecipe === item.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#999"
        />
      </TouchableOpacity>
      {expandedRecipe === item.id && (
        <View style={styles.recipeContent}>
          <Text>{item.description}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RecipeDetailView', { recipe: item })}>
            <Text style={styles.viewRecipeText}>View Recipe</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

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
    elevation: 2,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  viewRecipeText: {
    paddingTop: 5,
    color: 'blue',
  },
});
