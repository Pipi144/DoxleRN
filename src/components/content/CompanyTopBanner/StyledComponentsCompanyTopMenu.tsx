import styled from 'styled-components/native';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
import {Button, Popover} from 'native-base';
import Animated from 'react-native-reanimated';

export const RootCompanyTopMenu = styled.View<{
  themeColor: IDOXLEThemeColor;
  topInset: number;
}>`
  height: ${p => p.topInset + 40}px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${p => p.themeColor.primaryContainerColor};
  padding-left: 14px;
  padding-right: 14px;
  padding-top: ${p => p.topInset}px;
`;

export const StyledCompanyDisplayerButton = styled(Button)<{
  themeColor: IDOXLEThemeColor;
}>`
  height: 31px;
  background: #7070ff;
  border-radius: 13px;
  font-family: 'WorkSans-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.05em;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 8px !important;
  text-transform: uppercase;
`;
export const StyledCompanyMenuTitle = styled(Popover.Header)<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: 'WorkSans-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 32px;
  letter-spacing: 0.05em;

  color: #ffffff;
`;
export const StyledTabMenuContainer = styled.ScrollView`
  flex: 1;
  height: 100%;
  margin-left: 14px;
`;
export const RootTabMenuItem = styled.Pressable<{
  themeColor: IDOXLEThemeColor;
}>`
  position: relative;
  height: 23px;
  min-width: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 4px;
`;
export const StyledTabMenuText = styled(Animated.Text)<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
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
  background-color: ${p => p.themeColor.doxleColor};
  z-index: 0;
  border-radius: 13px;
`;
