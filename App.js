import React from 'react';
import {
  StyleSheet,
  Text,
  View,
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
  Card,
  Title,
  Paragraph,
  Chip,
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { Item } from './Components/Item';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

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
