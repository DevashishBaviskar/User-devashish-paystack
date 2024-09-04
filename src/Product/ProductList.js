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

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetails', {productId: item.id})
      }>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
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
        <ScrollView vertical={true}>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },
  image: {
    width: '60%',
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: 'green',
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
});

export default ProductList;
