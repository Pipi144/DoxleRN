import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootTabMenuContainer,
  StyledSelectedTabMenuAnimatedMask,
  StyledTabMenuButton,
  StyledTabMenuText,
} from './StyledComponentsRootApp';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from './Providers/DoxleThemeProvider';

import {StretchInX, StretchOutX} from 'react-native-reanimated';

import {NavigationState, useNavigationState} from '@react-navigation/native';
import {DOXLE_MENU_LIST, TDoxleMenu} from './RootApp';

import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type Props = {};
export type RootStackParamList = {
  YourScreen: {id: number} | undefined;
};
const TabMenuItem: React.FC<{
  item: TDoxleMenu;
  selectedMenuTab: TDoxleMenu;
  handlePressTabMenuItem: (item: TDoxleMenu) => void;
}> = ({item, selectedMenuTab, handlePressTabMenuItem}) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */
  return (
    <StyledTabMenuButton
      themeColor={THEME_COLOR}
      onPress={() => handlePressTabMenuItem(item)}>
      <StyledTabMenuText themeColor={THEME_COLOR}>{item}</StyledTabMenuText>
      {selectedMenuTab === item && (
        <StyledSelectedTabMenuAnimatedMask
          themeColor={THEME_COLOR}
          entering={StretchInX.duration(100)}
          exiting={StretchOutX.duration(100)}
        />
      )}
    </StyledTabMenuButton>
  );
};
const RootAppTabMenu = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentRoute = useNavigationState(
    state => state.routes[state.index].name,
  );

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */
  const handlePressTabMenuItem = (item: TDoxleMenu) => {
    navigation.navigate(item as never, {} as never);
  };
  return (
    <RootTabMenuContainer themeColor={THEME_COLOR}>
      {DOXLE_MENU_LIST.map((tabItem, idx) => (
        <TabMenuItem
          item={tabItem}
          key={`tab#${idx}`}
          selectedMenuTab={currentRoute as TDoxleMenu}
          handlePressTabMenuItem={handlePressTabMenuItem}
        />
      ))}
    </RootTabMenuContainer>
  );
};

export default React.memo(RootAppTabMenu);

const styles = StyleSheet.create({});
