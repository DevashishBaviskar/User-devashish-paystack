import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const ProductList = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductList = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product list:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProductList();
  }, []);

  const renderProduct = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: item.id})
      }>
      <Image source={{uri: item.thumbnail}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productDiscount}>
          {item.discountPercentage}% Off
        </Text>
        <Text style={styles.productRating}>Rating: {item.rating} ★</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.main_container2}>
      <View style={styles.heading_container}>
        <Text style={styles.header_text}>Product List</Text>
      </View>
      {loading ? (
        <View style={{flex: 1}}>
          <View style={styles.activityindicatorstyle}>
            <ActivityIndicator size="large" color="#1D1C68" />
          </View>
        </View>
      ) : (
        <View vertical={true}>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productList: {
    padding: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  main_container2: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  heading_container: {
    backgroundColor: '#1D1C68', //'#ff003f',
    flexDirection: 'row',
    padding: 15,
  },
  header_text: {
    fontSize: 15,
    // fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    marginTop: 2,
    textAlign: 'center',
  },
  activityindicatorstyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_icon: {
    width: 22,
    height: 21,
    resizeMode: 'contain',
    marginTop: 2,
  },
  productDiscount: {
    fontSize: 12,
    color: '#ff4500',
    marginTop: 5,
  },
  productRating: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default ProductList;
