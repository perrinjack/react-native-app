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
} from 'react-native';

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Chip,
} from 'react-native-paper';

import { Icon, CardItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const allRecipes = [
  {
    id: 1,
    recipeName: 'Cookies',
    duration: 30,
    image:
      'https://www.chasinglenscapes.com/wp-content/uploads/2020/06/food-photography-on-the-go-tips.jpg',
  },
  {
    id: 2,
    recipeName: 'Pie and Mash',
    duration: 50,
    image:
      'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=0.856xw:0.571xh;0.0224xw,0.296xh&resize=640:*',
  },
  {
    id: 3,
    recipeName: 'Lobster',
    duration: 50,
    image:
      'https://c.ndtvimg.com/2020-01/dd46j918_chilli-chicken_625x300_21_January_20.jpg',
  },
  {
    id: 4,
    recipeName: 'Other',
    duration: 30,
    image:
      'https://asset1.cxnmarksandspencer.com/is/image/mands/0533_20201001_FTO_1200X1200?wid=900&qlt=70&fmt=pjpeg',
  },
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
        <Title>{recipe[0].recipeName}</Title>
        <Paragraph>
          Card content tectagdagcvdhzvcbhzx bhxz shbcbxz cb x
          chabdhbchdabchbadhjbchjbdahbcdhc cdbchbdshcbdhsbchdsbhcbsdh
        </Paragraph>
        <Chip icon="information">Example Chip</Chip>
      </Card.Content>
    </Card>
  </View>
);

const renderItem = ({ item }) => <Item title={item.recipeName} />;

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
