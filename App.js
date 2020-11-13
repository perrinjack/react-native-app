import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageSafeAreaView,
  VirtualizedList,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Icon } from 'react-native-elements';
import allRecipes from './allRecipes.json';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Chip,
  DefaultTheme,
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  IconButton,
} from 'react-native-paper';
import merge from 'deepmerge';
import { CardItem } from 'react-native-elements';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  av: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  time: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
    justifyContent: 'space-between',
  },
  logo: {
    width: 150,
    height: 158,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 8,
  },
});

const Item = ({ recipe, navigation }) => (
  <View style={{ flex: 1 }}>
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
        <View style={styles.time}>
          <View style={styles.row}>
            <Avatar.Image
              style={styles.av}
              size={26}
              source={{
                uri:
                  'data:image/png;base64,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',
              }}
            />
            <Paragraph style={{ fontWeight: 'light' }}>
              {recipe[0].user}
            </Paragraph>
          </View>
          <View style={styles.row}>
            <Avatar.Icon
              style={styles.av}
              color="pink"
              size={26}
              icon="clock"
            />
            <Paragraph style={{ fontWeight: 'bold' }}>
              {recipe[0].duration} mins
            </Paragraph>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles1.row}>
            <Chip
              icon="camera"
              style={styles1.chip}
              onPress={() =>
                navigation.navigate('Orders', {
                  itemId: recipe,
                })
              }
            >
              <Text style={styles1.chipText}>Vegan</Text>
            </Chip>

            <Chip
              icon="camera"
              style={styles1.chip}
              onPress={() =>
                navigation.navigate('Orders', {
                  itemId: recipe,
                })
              }
            >
              ><Text style={styles1.chipText}>Gluten Free</Text>
            </Chip>

            <Chip
              icon="camera"
              style={styles1.chip}
              onPress={() =>
                navigation.navigate('Orders', {
                  itemId: recipe,
                })
              }
            >
              <Text style={styles1.chipText}>£5</Text>
            </Chip>
          </View>
        </ScrollView>
      </Card.Content>
    </Card>
  </View>
);

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-evenly',
    borderBottomColor: 'pink',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  chip: {
    backgroundColor: 'pink',
    margin: 4,
  },
  chipText: {
    color: 'black',
  },
});

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
      <HomeNav.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ headerShown: true }}
      />
    </HomeNav.Navigator>
  );
};

// const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    text: 'pink',
  },
};

const Tab = createMaterialBottomTabNavigator();
const HomeNav = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="pink"
          inactiveColor="black"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size }) => {
              let iconName;
              let color = 'pink';
              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-add';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'My Favs') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
              return <Icon name={iconName} type="ionicon" color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="My Favs" component={OrdersScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
