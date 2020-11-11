import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ImageSafeAreaView,
  VirtualizedList,
  SafeAreaView,
  FlatList,
  Image,
  Card,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const allRecipes = [
  { id: 1, recipeName: 'Cookies', duration: 30 },
  { id: 2, recipeName: 'Pie and Mash', duration: 50 },
  { id: 3, recipeName: 'Lobster', duration: 50 },
  { id: 4, recipeName: 'Other', duration: 30 },
];
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  logo: {
    width: 150,
    height: 158,
  },
  title: {
    fontSize: 32,
  },
});

const Item = ({ recipe, navigation }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{recipe[0].recipeName}</Text>
    <Text style={styles.title}>hello</Text>
    <Button
      title={'View Recipe'}
      onPress={() =>
        navigation.navigate('Recipe', {
          itemId: recipe,
        })
      }
    />
  </View>
);

const renderItem = ({ item }) => (
  <Card>
    <Card.Title>HELLO WORLD</Card.Title>
    <Card.Divider />
    <Text style={{ marginBottom: 10 }}>
      The idea with React Native Elements is more about component structure than
      actual design.
    </Text>
    <Button
      icon={<Icon name="code" color="#ffffff" />}
      buttonStyle={{
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      title="VIEW NOW"
    />
  </Card>
);

function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Item recipe={[item]} navigation={navigation} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings in dev!</Text>
    </View>
  );
}

function OrdersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Orders in dev!</Text>
    </View>
  );
}

function RecipeScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={styles.logo}
        source={{
          uri:
            'https://d3vn5rg72hh8yg.cloudfront.net/cdn/imagesource/previews/3886/a4877f5e8352c499c437c3405e13cac1/3/3c645bb97a1a1d98023559f171bc3506/1165646.jpg',
        }}
      />
      <Text>Recipe Screen</Text>
      <Text> {itemId[0].recipeName}</Text>
      <Text>{itemId[0].duration} </Text>
    </View>
  );
}

const HomeStack = () => {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeNav.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerShown: true }}
      />
    </HomeNav.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const HomeNav = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="My Favs" component={OrdersScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
