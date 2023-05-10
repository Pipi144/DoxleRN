import styled from 'styled-components/native';
import {
  IDOXLEThemeColor,
  IDoxleFont,
} from '../../../Providers/DoxleThemeProvider';
import {Input} from 'native-base';
import Animated from 'react-native-reanimated';
import {SyncedFlatlist} from '../GeneraComponents/SyncScrollViews/SyncedFlatList';

export const StyledFilesContainer = styled.View<{themeColor: IDOXLEThemeColor}>`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
`;

export const StyledFilesTopSection = styled.View`
  margin-top: 4px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledTopSectionFirstRow = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const StyledFilesTitleText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.primaryFont};
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: ${p => p.themeColor.primaryFontColor};
  margin-bottom: 8px;
  margin-top: 10px;
  margin-left: 4px;
`;

export const FilesSubTitleText = styled.Text<{
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
export const InputSearchWrapper = styled.View`
  width: 70%;
  max-width: 800px;
  height: 30px;
  background-color: #e3e5eb;
  border-radius: 13px;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const SearchInput = styled(Input)<{
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
export const StyledFileBottomSection = styled.View`
  flex: 1;
  width: 100%;
  position: relative;
  display: flex;
  background-color: white;
`;

export const StyledFilesDataRow = styled.View`
  height: 44px;
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
`;

export const StyledFilesDataRowText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  margin-top: 18px;
  margin-left: 12px;
  font-family: ${p => p.doxleFont.primaryFont};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: ${p => p.themeColor.primaryFontColor};
  max-width: 80%;
`;
