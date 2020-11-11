   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen: List recipe items here.</Text>

      {allRecipes.items.map((item) => (
        <Button
          title={item.recipeName}
          onPress={() =>
            navigation.navigate('Recipe', {
              itemId: item,
            })
          }
        />
      ))}
    </View>