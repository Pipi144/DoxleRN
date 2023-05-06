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

import {SyncScrollViewProvider} from './components/content/GeneraComponents/SyncScrollViews/SyncScrollViewProvider';
import {
  ICompanyProviderContextValue,
  useCompany,
} from './Providers/CompanyProvider';
import DocketTimeline from './components/content/DocketTimeline/DocketTimeline';
import CompanyTopMenu from './components/content/CompanyTopMenu/CompanyTopMenu';

type Props = {};

const RootApp = (props: Props) => {
  const NavigationStack = createNativeStackNavigator();

  //************* AUTH PROVIDER*************** */
  const {loggedIn, isCheckingLogInStatus} = useAuth() as authContextInterface;
  //*******END OF  AUTH PROVIDER************ */

  //************* NOTIFICATION PROVIDER*************** */
  const {notifierRootAppRef} = useNotification() as INotificationContext;
  //*********END OF NOTIFICATION PROVIDER ******** */

  //************ COMPANY PROVIDER ************* */
  const {company, isLoadingCompany} =
    useCompany() as ICompanyProviderContextValue;

  //************END OF COMPANY PROVIDER ******** */
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

          {loggedIn && <CompanyTopMenu />}
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
                          <DocketTimeline
                            {...props}
                            navigation={props.navigation}
                          />
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
