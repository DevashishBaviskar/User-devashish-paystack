import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const ProductDetails = ({route}) => {
  const navigation = useNavigation();
  const {productId} = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [productId]);

  const orderDataTable =
    product === 0 ? (
      <Text style={styles.table_record}>{LanguageStrings.noRecordsFound}.</Text>
    ) : (
      product && (
        <View
          style={{
            alignContent: 'center',
            margin: 20,
            marginTop: 20,
            flex: 1,
          }}>
          <>
            <Image source={{uri: product.thumbnail}} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </>
        </View>
      )
    );
  // const customerNameList = orderdata.data.map(cust => )
  return (
    <SafeAreaView style={styles.main_container2}>
      <View style={styles.heading_container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/images/Left4.png')}
            style={styles.back_icon}
          />
        </TouchableOpacity>

        <Text style={styles.header_text}>Product Details</Text>
      </View>
      {loading ? (
        <View style={{flex: 1}}>
          <View style={styles.activityindicatorstyle}>
            <ActivityIndicator size="large" color="#1D1C68" />
          </View>
        </View>
      ) : (
        <ScrollView vertical={true}>{orderDataTable}</ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 22,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
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
    marginLeft: 15,
    marginTop: 2,
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

export default ProductDetails;
