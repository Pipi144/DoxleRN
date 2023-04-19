import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
import {IconButton} from '@react-native-material/core';

export const RootLoginScreen = styled(Animated.View)<{
  themeColor: IDOXLEThemeColor;
}>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
  position: relative;
`;

export const StyledVersionText = styled.Text<{themeColor: IDOXLEThemeColor}>`
  font-family: 'NostromoRegular-Light';
  font-size: 8px;
  position: absolute;
  bottom: 15px;
  text-transform: uppercase;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const StyledLoginTitleText = styled.Text<{themeColor: IDOXLEThemeColor}>`
  font-family: 'IBMPlexSans-SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 39px;
  color: ${p => p.themeColor.primaryFontColor};
  padding-left: 8px;

  margin-bottom: 4px;
`;
export const StyledLoginTextInputContainer = styled(Animated.View)<{
  themeColor: IDOXLEThemeColor;
  deviceWidth: number;
}>`
  width: ${p => (p.deviceWidth < 700 ? 253 : 350)}px;
  height: 33px;
  background-color: ${p => p.themeColor.primaryContainerColor};
  border-radius: 13px;
  padding: 2px 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StyledLoginFormButton = styled(IconButton)`
  width: 32px;
  height: 24px;
  background: #7b7bfe;
  border-radius: 17px;
`;
export const StyledLoginTextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #7a8294;
`;
export const StyledAnimatedErrorText = styled(Animated.Text)`
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: red;
  margin-top: 8px;

  text-align: center;
`;
export const StyledErrorMessageContainer = styled.View`
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledMagicLinkText = styled.Text`
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: #626276;
  margin-top: 8px;
`;
export const StyledLoadingMaskScreen = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  top: 0;
  left: 0;
`;
