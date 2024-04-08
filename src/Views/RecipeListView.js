import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Chip, Avatar } from 'react-native-paper';
import { categoryPastelColors, categoryIcons, darkenedColor } from '../../includes/variables';


const RecipeListView = ({ navigation, recipes }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  useEffect(() => {
    setRecipeData(recipes);
  }, [recipes]);


  const toggleRecipeExpansion = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  const renderItem = ({ item }) => {
  
  const capitalizedCategory = item.category.charAt(0).toUpperCase() + item.category.slice(1);
  
    return (
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
            <Chip
              style={{ backgroundColor: categoryPastelColors[capitalizedCategory.toLowerCase()], width: 120 }}
              avatar={<Avatar.Icon
                size={38}
                icon={categoryIcons[capitalizedCategory.toLowerCase()]}
                color={darkenedColor[capitalizedCategory.toLowerCase()]}
                style={{ backgroundColor: categoryPastelColors[capitalizedCategory.toLowerCase()] }}
              />}
            >
              {capitalizedCategory}
            </Chip>
            <TouchableOpacity onPress={() => navigation.navigate('RecipeDetailView', { item })}>
              <Text style={styles.viewRecipeText}>View Recipe</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: 20,
    color: 'blue',
  },
});


export default RecipeListView;
