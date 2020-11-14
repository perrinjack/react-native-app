import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Chip,
  Button,
} from 'react-native-paper';
import { RecipeChip } from './RecipeItem';
const styles = StyleSheet.create({
  av: {
    marginHorizontal: 7,
    backgroundColor: 'black',
  },
  paragraph: {
    marginTop: 10,
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
  subtitle: {
    fontWeight: 'bold',

    marginVertical: 8,
  },
  servings: {
    marginVertical: 8,
    fontSize: 16,
  },
  chip: {
    backgroundColor: 'pink',
    margin: 4,
  },
  chipText: {
    color: 'black',
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
  subtitlerow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  table: {
    marginHorizontal: 20,
    backgroundColor: 'black',
  },
  tableT: {
    color: 'black',
  },
});

export const RecipeSingularItem = ({ recipe }) => (
  <ScrollView>
    <Card>
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
        <Paragraph style={styles.paragraph}>{recipe[0].content}</Paragraph>
        <View>
          <View style={styles.chiprow}>
            {recipe[0].tags.map((x) => (
              <RecipeChip icon="camera" text={x} />
            ))}
          </View>
        </View>
        <View style={styles.subtitlerow}>
          <Title style={styles.subtitle}>Ingredients</Title>
          <Title style={styles.servings}>4 Servings</Title>
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row key={1}>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>

            <DataTable.Cell numeric>6 cups</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row key={2}>
            <DataTable.Cell>Eggs </DataTable.Cell>

            <DataTable.Cell numeric>80g</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={3}>
            <DataTable.Cell>Beers</DataTable.Cell>

            <DataTable.Cell numeric>80g</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={4}>
            <DataTable.Cell>Fosters</DataTable.Cell>

            <DataTable.Cell numeric>80g</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row key={5}>
            <DataTable.Cell>Ice cream </DataTable.Cell>

            <DataTable.Cell numeric>80g</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Button mode="outlined" l abelStyle={{ color: 'pink' }}>
          Purchase Items
        </Button>
      </Card.Content>
    </Card>

    <View style={styles.details}></View>
  </ScrollView>
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
