import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootTabMenuItem,
  StyledSelectedTabMenuAnimatedMask,
  StyledTabMenuText,
} from './StyledComponentsCompanyTopMenu';
import {
  StretchInX,
  StretchOutX,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TDoxleMenu} from '../../../RootApp';

type Props = {
  item: TDoxleMenu;
  selectedMenuTab: TDoxleMenu;
  handlePressTabMenuItem: (item: TDoxleMenu) => void;
};

const TabMenuItem = ({
  item,
  selectedMenuTab,
  handlePressTabMenuItem,
}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */

  //################ HANDLE ANIMATION ###############
  const tabMenuTextSharedValue = useSharedValue(0);
  const tabMenuAnimatedStyle = useAnimatedStyle(() => {
    const tabMenuTextInterpolateColor = interpolateColor(
      tabMenuTextSharedValue.value,
      [0, 1],
      [THEME_COLOR.primaryFontColor, THEME_COLOR.primaryReverseFontColor],
    );
    return {
      color: tabMenuTextInterpolateColor,
    };
  });
  useEffect(() => {
    if (selectedMenuTab === item)
      tabMenuTextSharedValue.value = withTiming(1, {duration: 200});
    else if (tabMenuTextSharedValue.value !== 0)
      tabMenuTextSharedValue.value = withTiming(0, {duration: 100});
  }, [selectedMenuTab]);

  //#################################################
  return (
    <RootTabMenuItem
      themeColor={THEME_COLOR}
      onPress={() => handlePressTabMenuItem(item)}>
      <StyledTabMenuText
        themeColor={THEME_COLOR}
        style={[tabMenuAnimatedStyle]}>
        {item}
      </StyledTabMenuText>
      {selectedMenuTab === item && (
        <StyledSelectedTabMenuAnimatedMask
          themeColor={THEME_COLOR}
          entering={StretchInX.duration(100)}
          exiting={StretchOutX.duration(100)}
        />
      )}
    </RootTabMenuItem>
  );
};

export default TabMenuItem;

const styles = StyleSheet.create({});
