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
import React, {useEffect} from 'react';
import {CompanyProvider} from './src/Providers/CompanyProvider';
import {Provider as PaperProvider} from 'react-native-paper';
const queryClient = new QueryClient();

const theme = extendTheme({});

function App(): JSX.Element {
  useEffect(() => {
    queryClient.clear();
  }, []);
  return (
    <SafeAreaProvider>
      <PaperProvider>
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
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
