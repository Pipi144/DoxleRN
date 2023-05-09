import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CompanyTopBanner from './components/content/CompanyTopBanner/CompanyTopBanner';
import RootAppTabMenu from './RootAppTabMenu';
import {DocketTimelineProvider} from './Providers/DocketTimelineProvider';
import DocketTimeline from './components/content/DocketTimeline/DocketTimeline';
import {DocketProvider} from './Providers/DocketProvider';
import Inbox from './components/content/Inbox/Inbox';
import Files from './components/content/Files/Files';
import Projects from './components/content/Projects/Projects';

type Props = {
  navigation: any;
};
export type TDoxleMenu = 'Inbox' | 'Projects' | 'Files' | 'Timeline';
export const DOXLE_MENU_LIST: TDoxleMenu[] = [
  'Inbox',
  'Projects',
  'Files',
  'Timeline',
];
const HomePage = ({navigation}: Props) => {
  //################## STATES ###############

  //#########################################
  const HomeStack = createNativeStackNavigator();
  return (
    <>
      <CompanyTopBanner />
      <RootAppTabMenu />
      <HomeStack.Navigator
        initialRouteName="Inbox"
        screenOptions={{
          headerShown: false,
        }}>
        {DOXLE_MENU_LIST.map((menuItem, idx) => (
          <HomeStack.Screen
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
          </HomeStack.Screen>
        ))}
      </HomeStack.Navigator>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
