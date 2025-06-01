import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

export default function FavoritesScreen({ navigation, route }) {
  const favoriteProducts = route.params?.favorites || [];

  const handlePress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <View style={styles.container}>
      {favoriteProducts.length === 0 ? (
        <Text style={styles.emptyText}>Você ainda não tem produtos favoritos.</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
