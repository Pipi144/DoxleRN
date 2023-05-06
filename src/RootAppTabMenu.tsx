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
import {TDoxleMenu} from './RootApp';

import {StretchInX, StretchOutX} from 'react-native-reanimated';

type Props = {
  selectedMenuTab: TDoxleMenu;
  setselectedMenuTab: React.Dispatch<React.SetStateAction<TDoxleMenu>>;
};
const DOXLE_MENU_LIST: TDoxleMenu[] = [
  'Inbox',
  'Projects',
  'Files',
  'Timeline',
];

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
const RootAppTabMenu = ({selectedMenuTab, setselectedMenuTab}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */
  const handlePressTabMenuItem = (item: TDoxleMenu) => {
    setselectedMenuTab(item);
  };
  return (
    <RootTabMenuContainer themeColor={THEME_COLOR}>
      {DOXLE_MENU_LIST.map((tabItem, idx) => (
        <TabMenuItem
          item={tabItem}
          key={`tab#${idx}`}
          selectedMenuTab={selectedMenuTab}
          handlePressTabMenuItem={handlePressTabMenuItem}
        />
      ))}
    </RootTabMenuContainer>
  );
};

export default React.memo(RootAppTabMenu);

const styles = StyleSheet.create({});
