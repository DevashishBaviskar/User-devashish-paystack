import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from './src/Product/ProductList';
import ProductDetails from './src/Product/ProductDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <InAppNotificationProvider closeInterval={10000} backgroundColour="#faebd7">
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </InAppNotificationProvider>
  );
};

export default App;
