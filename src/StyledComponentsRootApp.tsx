import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {IDOXLEThemeColor} from './Providers/DoxleThemeProvider';
import {Button, IconButton} from 'react-native-paper';

export const RootAppContainer = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  background-color: #fff;
  position: relative;
  z-index: 0;
`;
export const RootDoxleIconDisplayer = styled(Animated.View)`
  position: absolute;
  bottom: 20px;
  left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
export const StyledDoxleIconDisplayerText = styled.Text`
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 4px;
  line-height: 6px;
  color: #585b62;
  text-transform: none;
`;
export const StyledLoadingMaskRootApp = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 10;
  background-color: rgba(255, 255, 255, 1);
`;
export const RootTabMenuContainer = styled.View<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  padding: 14px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
`;
export const StyledTabMenuButton = styled.Pressable<{
  themeColor: IDOXLEThemeColor;
}>`
  position: relative;
  height: 25px;
  min-width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTabMenuText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${p => p.themeColor.primaryFontColor};
  z-index: 1;
`;
export const StyledSelectedTabMenuAnimatedMask = styled(Animated.View)<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${p => p.themeColor.primaryContainerColor};
  z-index: 0;
  border-radius: 13px;
`;
