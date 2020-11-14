import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { Avatar, Card, Title, Paragraph, Chip } from 'react-native-paper';

const styles = StyleSheet.create({
  av: {
    marginHorizontal: 7,
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 8,
  },
  chip: {
    margin: 4,
  },
  chipText: {
    color: 'pink',
  },
  chiprow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-evenly',
    borderBottomColor: 'pink',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
});

export const RecipeItem = ({ recipe, navigation }) => (
  <View>
    <Card
      onPress={() =>
        navigation.navigate('Recipe', {
          itemId: recipe,
        })
      }
    >
      <Card.Cover
        source={{
          uri: recipe[0].image,
        }}
      />
      <Card.Content>
        <Title style={styles.title}>{recipe[0].recipeName}</Title>
        <View style={styles.details}>
          <RecipeOwner recipe={recipe} />
          <RecipeDuration recipe={recipe} />
        </View>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.chiprow}>
            {recipe[0].tags.map((x) => (
              <RecipeChip icon="camera" text={x} />
            ))}
          </View>
        </ScrollView>
      </Card.Content>
    </Card>
  </View>
);

export const RecipeChip = ({ icon, text }) => (
  <Chip icon={icon} style={styles.chip} textStyle={styles.chipText}>
    <Text>{text}</Text>
  </Chip>
);

const RecipeOwner = ({ recipe }) => (
  <View style={styles.row}>
    <Avatar.Image
      style={styles.av}
      size={26}
      source={{
        uri: recipe[0].user.image,
      }}
    />
    <Paragraph>{recipe[0].user.name}</Paragraph>
  </View>
);

const RecipeDuration = ({ recipe }) => (
  <View style={styles.row}>
    <Avatar.Icon style={styles.av} color="pink" size={26} icon="clock" />
    <Paragraph>{recipe[0].duration} mins</Paragraph>
  </View>
);
