import styled from 'styled-components/native';
import {
  IDOXLEThemeColor,
  IDoxleFont,
} from '../../../Providers/DoxleThemeProvider';
import {Input} from 'native-base';
import Animated from 'react-native-reanimated';
import {SyncedFlatlist} from '../GeneraComponents/SyncScrollViews/SyncedFlatList';

export const RootInboxTopSection = styled.View`
  margin-top: 30px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const RootInbox = styled.View<{themeColor: IDOXLEThemeColor}>`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
`;
export const StyledInboxTitleText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.primaryFont};
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;

  color: ${p => p.themeColor.primaryFontColor};
  margin-bottom: 14px;
  margin-top: 4px;
`;
export const StyledInboxSubTitleText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.primaryFont};
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: ${p => p.themeColor.primaryFontColor};
  max-width: 80%;
`;
export const StyledInputSearchWrapper = styled.View`
  width: 70%;
  max-width: 800px;
  height: 30px;
  background-color: #e3e5eb;
  border-radius: 13px;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StyledSearchInput = styled(Input)<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.secondaryTitleFont};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`;
export const StyledDocketInboxContentDisplayer = styled.View`
  flex: 1;
  width: 100%;
  position: relative;
  display: flex;
`;
export const RootInboxDataRow = styled.View`
  width: 100%;
`;

export const RootDocketDataList = styled.ScrollView`
  height: 100%;
  width: 100%;
  z-index: 0;
`;
