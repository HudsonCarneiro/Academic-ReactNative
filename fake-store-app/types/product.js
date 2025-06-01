export const createProduct = (data) => ({
  id: data.id,
  title: data.title,
  price: data.price,
  description: data.description,
  image: data.image,
  category: data.category,
  rating: data.rating,
});

export const createProductCardProps = (product, onPress) => ({
  product,
  onPress,
});
