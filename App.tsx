/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {NativeBaseProvider, extendTheme} from 'native-base';
import {NotificationProvider} from './src/Providers/NotificationProvider';
import {AuthProvider} from './src/Providers/AuthProvider';
import RootApp from './src/RootApp';
import {InternetConnectionProvider} from './src/Providers/InternetConnectionProvider';
import {OrientationProvider} from './src/Providers/OrientationContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import {CompanyProvider} from './src/Providers/CompanyProvider';

const queryClient = new QueryClient();

const theme = extendTheme({
  // colors: {
  //   primary: {
  //     50: '#FFFFFF',
  //     100: '#F7F7FF',
  //     200: '#D8D8FF',
  //     300: '#B9B9FF',
  //     400: '#9A9AFF',
  //     500: '#7B7BFF',
  //     600: '#7B7BFE',
  //     700: '#5D5DFF',
  //     800: '#3E3EFF',
  //     900: '#1F1FFF',
  //   },
  //   success: {
  //     600: '#12B718',
  //   },
  // },
  // fontSizes: {
  //   sm: 11,
  //   md: 14,
  //   lg: 21,
  // },
  // fonts: {
  //   heading: 'IBMPlexSans-Medium',
  //   body: 'IBMPlexSans-Regular',
  //   mono: 'IBMPlexMono-Regular',
  // },
  // letterSpacings: {
  //   md: 0.8,
  // },
});

function App(): JSX.Element {
  useEffect(() => {
    queryClient.clear();
  }, []);
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <InternetConnectionProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <OrientationProvider>
                <NativeBaseProvider theme={theme}>
                  <CompanyProvider>
                    <RootApp />
                  </CompanyProvider>
                </NativeBaseProvider>
              </OrientationProvider>
            </QueryClientProvider>
          </AuthProvider>
        </InternetConnectionProvider>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}

export default App;
