import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import {
  RootAppContainer,
  StyledLoadingMaskRootApp,
} from './StyledComponentsRootApp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/content/Login/Login';
import {authContextInterface, useAuth} from './Providers/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from './Providers/DoxleThemeProvider';
import {OrientationProvider} from './Providers/OrientationContext';
import LoadingDoxleIconWithText from './Utilities/AnimationScreens/LoadingDoxleIconWithText/LoadingDoxleIconWithText';
import {
  INotificationContext,
  useNotification,
} from './Providers/NotificationProvider';
import {NotifierRoot} from 'react-native-notifier';

import {SyncScrollViewProvider} from './components/content/GeneraComponents/SyncScrollViews/SyncScrollViewProvider';
import {
  ICompanyProviderContextValue,
  useCompany,
} from './Providers/CompanyProvider';

import {DocketTimelineProvider} from './Providers/DocketTimelineProvider';
import DocketTimeline from './components/content/DocketTimeline/DocketTimeline';
import {DocketProvider} from './Providers/DocketProvider';
import Inbox from './components/content/Inbox/Inbox';
import Files from './components/content/Files/Files';
import Projects from './components/content/Projects/Projects';
import CompanyTopBanner from './components/content/CompanyTopBanner/CompanyTopBanner';

type Props = {};
export type TDoxleMenu = 'Inbox' | 'Projects' | 'Files' | 'Timeline';
export const DOXLE_MENU_LIST: TDoxleMenu[] = [
  'Inbox',
  'Projects',
  'Files',
  'Timeline',
];
const RootApp = (props: Props) => {
  const NavigationStack = createNativeStackNavigator();

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */

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
    <OrientationProvider>
      <RootAppContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <DoxleIconDisplayer /> */}
        {isCheckingLogInStatus && (
          <StyledLoadingMaskRootApp>
            <LoadingDoxleIconWithText message="Checking session...Please Wait!" />
          </StyledLoadingMaskRootApp>
        )}

        <SyncScrollViewProvider>
          <NavigationContainer>
            {loggedIn && <CompanyTopBanner />}
            <NavigationStack.Navigator
              initialRouteName="Files"
              screenOptions={{
                headerShown: false,
              }}>
              {loggedIn ? (
                <NavigationStack.Group>
                  {DOXLE_MENU_LIST.map((menuItem, idx) => (
                    <NavigationStack.Screen
                      key={`menu#${idx}`}
                      name={menuItem}
                      navigationKey={menuItem}>
                      {props =>
                        menuItem === 'Timeline' ? (
                          <DocketTimelineProvider>
                            <DocketTimeline {...props} />
                          </DocketTimelineProvider>
                        ) : menuItem === 'Inbox' ? (
                          <DocketProvider>
                            <Inbox {...props} />
                          </DocketProvider>
                        ) : menuItem === 'Files' ? (
                          <Files {...props} />
                        ) : (
                          <DocketProvider>
                            <Projects {...props} />
                          </DocketProvider>
                        )
                      }
                    </NavigationStack.Screen>
                  ))}
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
  );
};

export default RootApp;

const styles = StyleSheet.create({});
