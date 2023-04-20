import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import {
  RootAppContainer,
  StyledLoadingMaskRootApp,
} from './StyledComponentsRootApp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/content/Login/Login';
import {authContextInterface, useAuth} from './Providers/AuthProvider';
import {Company} from './Models/company';
import {NavigationContainer} from '@react-navigation/native';
import {DOXLEThemeProvider} from './Providers/DoxleThemeProvider';
import {OrientationProvider} from './Providers/OrientationContext';
import LoadingDoxleIconWithText from './Utilities/AnimationScreens/LoadingDoxleIconWithText/LoadingDoxleIconWithText';
import {
  INotificationContext,
  useNotification,
} from './Providers/NotificationProvider';
import {NotifierRoot} from 'react-native-notifier';
import {DocketTimelineProvider} from './Providers/DocketTimelineProvider';
import DocketTimeline from './components/content/DocketTimeline/DocketTimeline';
import {SyncScrollViewProvider} from './components/content/GeneraComponents/SyncScrollViews/SyncScrollViewProvider';

type Props = {};
const company: Company = {
  addressCity: 'Mulgrave',
  addressCountry: '',
  addressL1: '',
  addressL2: '',
  addressPostCode: '3170',
  addressState: 'VIC',
  companyAbn: '27 629 050 326',
  companyId: 'c074feca-fd03-4620-88b4-efedc1235ad1',
  email: 'build@byson.com.au',
  logo: 'https://firebasestorage.googleapis.com/v0/b/doxle-build-98566.appspot.com/o/company%2Fbyson%2Fstorage%2Flogo_1632874290638.png?alt=media&token=27d1a49d-1eca-447e-9026-cbcc3f360c29',
  name: 'Byson Group',
  owner: '6c46322b-405f-41c1-b406-2bf6f9b558c7',
  phone: '(03) 9052 4527',
};
const RootApp = (props: Props) => {
  const NavigationStack = createNativeStackNavigator();

  //************* AUTH PROVIDER*************** */
  const {loggedIn, isCheckingLogInStatus} = useAuth() as authContextInterface;
  //*********************************************** */
  //************* NOTIFICATION PROVIDER*************** */
  const {notifierRootAppRef} = useNotification() as INotificationContext;
  //*********************************************** */

  return (
    <DOXLEThemeProvider>
      <OrientationProvider>
        <RootAppContainer
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {/* <DoxleIconDisplayer /> */}
          {isCheckingLogInStatus && (
            <StyledLoadingMaskRootApp>
              <LoadingDoxleIconWithText message="Checking session...Please Wait!" />
            </StyledLoadingMaskRootApp>
          )}
          <SyncScrollViewProvider>
            <NavigationContainer>
              <NavigationStack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                {loggedIn ? (
                  <NavigationStack.Group>
                    <NavigationStack.Screen name="docketTimeline">
                      {props => (
                        <DocketTimelineProvider>
                          <DocketTimeline {...props} company={company} />
                        </DocketTimelineProvider>
                      )}
                    </NavigationStack.Screen>
                  </NavigationStack.Group>
                ) : (
                  <NavigationStack.Group>
                    <NavigationStack.Screen name="Login" component={Login} />
                  </NavigationStack.Group>
                )}
              </NavigationStack.Navigator>
            </NavigationContainer>
          </SyncScrollViewProvider>
          <NotifierRoot ref={notifierRootAppRef} />
        </RootAppContainer>
      </OrientationProvider>
    </DOXLEThemeProvider>
  );
};

export default RootApp;

const styles = StyleSheet.create({});
