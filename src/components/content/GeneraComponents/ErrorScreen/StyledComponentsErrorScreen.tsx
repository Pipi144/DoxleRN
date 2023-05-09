import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {
  IDOXLEThemeColor,
  IDoxleFont,
} from '../../../../Providers/DoxleThemeProvider';
import {Button} from 'react-native-paper';

export const RootErrorScreen = styled(Animated.View)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const StyledErrorText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.secondaryTitleFont};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const StyledRetryButton = styled(Button)<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  border-radius: 14px;
  padding: 0px 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${p => `${p.themeColor.doxleColor}`};
  margin-top: 14px;
  font-family: ${p => p.doxleFont.secondaryTitleFont};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;
