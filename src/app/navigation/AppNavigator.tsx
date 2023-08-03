import React, { ReactElement } from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';

import CryptoListScreen from '../ui/screens/CryptoListScreen';
import CryptoDetailScreen from '../ui/screens/CryptoDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES_APP } from '../constants/Routes';
import CryptoProvider from '../context/CryptoContext';
import CryptoRepository from '../data/repositories/CryptoRepository';

/* The line `const cryptoRepository = new CryptoRepository();` is creating a new instance of the
`CryptoRepository` class and assigning it to the `cryptoRepository` constant. This instance can be
used to access cryptographic functions or services provided by the `CryptoRepository` class. */
const cryptoRepository = new CryptoRepository();

const Stack = createStackNavigator();

/**
 * The `withCryptoProvider` function is a higher-order component that wraps a component with a
 * `CryptoProvider` component, providing it with a `cryptoRepository` prop.
 * @param WrappedComponent - The WrappedComponent is a React component that will be wrapped with the
 * CryptoProvider. It can be any valid React component that accepts props.
 * @param {CryptoRepository} cryptoRepository - The `cryptoRepository` parameter is an object that
 * represents a repository for accessing cryptographic functions or services. It is used by the
 * `WithCryptoProvider` component to provide the `cryptoRepository` to the `CryptoProvider` component,
 * which can then be accessed by the wrapped component (`WrappedComponent`).
 * @returns The function `withCryptoProvider` returns a higher-order component (HOC) called
 * `WithCryptoProvider`.
 */
const withCryptoProvider = <P extends object>(WrappedComponent: React.ComponentType<P>, cryptoRepository: CryptoRepository) => {
  const WithCryptoProvider: React.FC<P> = (props) => (
    <CryptoProvider cryptoRepository={cryptoRepository}>
      <WrappedComponent {...props} />
    </CryptoProvider>
  );
  return WithCryptoProvider;
};


/**
 * The AppNavigator function returns a navigation container with two screens, CryptoListScreen and
 * CryptoDetailScreen, wrapped in a CryptoProvider component.
 * @returns The AppNavigator component is returning a NavigationContainer component from the React
 * Navigation library. Inside the NavigationContainer, there is a Stack.Navigator component that
 * defines the navigation stack for the app. The initialRouteName prop is set to ROUTES_APP.CRYPTOLIST,
 * which is the name of the first screen to be displayed. Inside the Stack.Navigator, there are two
 * Stack.Screen components. The first one is
 */
const AppNavigator = () => {
  return (
    <CryptoProvider cryptoRepository={cryptoRepository}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES_APP.CRYPTOLIST}>
          <Stack.Screen name={ROUTES_APP.CRYPTOLIST} component={CryptoListScreen} />
          <Stack.Screen name={ROUTES_APP.CRYPTODETAIL} component={CryptoDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CryptoProvider>
  );
};

export default withCryptoProvider(AppNavigator, cryptoRepository);




