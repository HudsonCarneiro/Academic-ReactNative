import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { toggleFavorite, isFavorite } from '../utils/storage';

type RouteParams = {
  productId: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductDetailsScreen() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);
  const route = useRoute();
  const { productId } = route.params as RouteParams;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
        
        // Verifica se o produto está favoritado
        const isFav = await isFavorite(productId);
        setFavorite(isFav);
      } catch (err) {
        setError('Erro ao carregar detalhes do produto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleToggleFavorite = async () => {
    if (!product) return;
    
    const newFavoriteStatus = await toggleFavorite(product.id);
    setFavorite(newFavoriteStatus);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <View style={styles.rating}>
          <Text>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
        </View>
        
        <Text style={styles.category}>Categoria: {product.category}</Text>
        
        <Text style={styles.description}>{product.description}</Text>
        
        <Button
          title={favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          onPress={handleToggleFavorite}
          color={favorite ? 'red' : '#007AFF'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  rating: {
    marginBottom: 10,
  },
  category: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});