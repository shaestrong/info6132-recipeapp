import React, { useState, useRef } from 'react';
import { Text, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { withTheme, Chip, Avatar, Card, SegmentedButtons, TextInput as PaperTextInput } from 'react-native-paper';
import { categoryIcons, darkenedColor, categoryPastelColors } from '../../includes/variables';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const RecipeDetailView = ({ theme, route }) => {
  const { colors } = theme;
  const { item } = route.params;
  const [selectedSection, setSelectedSection] = useState('ingredients');
  const { height } = useWindowDimensions();
  const scrollViewRef = useRef(null);

  return (
    <Card style={styles.card} type='outlined'>
      <Card.Title
        title={item.name}
        titleStyle={styles.title}
        subtitle={<Chip
          style={{ backgroundColor: categoryPastelColors[item.category.toLowerCase()] }}
          avatar={<Avatar.Icon
            size={38}
            icon={categoryIcons[item.category.toLowerCase()]}
            color={darkenedColor[item.category.toLowerCase()]}
            style={{ backgroundColor: categoryPastelColors[item.category.toLowerCase()] }}
          />}
        >
          {capitalizeFirstLetter(item.category)}
        </Chip>}
      />
      <Card.Content>
        <SegmentedButtons
          value={selectedSection}
          onValueChange={setSelectedSection}
          style={styles.segmented}
          theme={{
            colors: {
              primary: 'colors.segmentActive,'
            },
            roundness: 2,
          }}
          buttons={[
            {
              value: 'ingredients',
              label: 'Ingredients',
              style: {
                backgroundColor:
                  selectedSection === 'ingredients'
                    ? colors.segmentActive
                    : '#fff',
              },
            },
            {
              value: 'preparation',
              label: 'Preparation',
              style: {
                backgroundColor:
                  selectedSection === 'preparation'
                    ? colors.segmentActive
                    : '#fff',
              },
            },
          ]}
        />
        {selectedSection === 'ingredients' ? (
          <ScrollView>
            {item.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.value}>{ingredient}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView ref={scrollViewRef}>
            <View style={styles.preparationContainer}>
              <Text style={styles.preparationText}>{item.preparation}</Text>
            </View>
          </ScrollView>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  value: {
    fontSize: 16,
  },
  card: {
    margin: 10,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
    marginBottom: 20
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 20
  },
  segmented: {
    marginVertical: 12,
  },
  textContainer: {
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#F1F1F1',
  },
  preparationContainer: {
    borderRadius: 8,
    marginBottom: 0,
    padding: 12,
    backgroundColor: '#F1F1F1',
  },
  preparationText: {
    fontSize: 16,
  },
});

export default withTheme(RecipeDetailView);
