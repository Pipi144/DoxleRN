import styled from 'styled-components/native';
import {
  IDOXLEThemeColor,
  IDoxleFont,
} from '../../../Providers/DoxleThemeProvider';
import {Input} from 'native-base';
import Animated from 'react-native-reanimated';
import {SyncedFlatlist} from '../GeneraComponents/SyncScrollViews/SyncedFlatList';

export const RootInboxTopSection = styled.View`
  margin-top: 4px;
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
export const StyledDocketNumberList = styled(SyncedFlatlist)<{
  widthInPixel: `${number}px`;
}>`
  position: absolute;
  width: ${p => p.widthInPixel};
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
`;
export const StyledDocketListHeaderText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.secondaryFont};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const StyledDocketListHeaderContainer = styled.View<{
  widthInPixel: `${number}px`;
  horizontalAlign?: 'center' | 'flex-start' | 'flex-end';
  paddingLeft?: `${number}px`;
  themeColor: IDOXLEThemeColor;
}>`
    width: ${p => p.widthInPixel};
    display:flex;
    flex-direction:row;
    justify-content: ${p => (p.horizontalAlign ? p.horizontalAlign : 'center')}
    align-items:center;
    background-color: ${p => p.themeColor.primaryBackgroundColor};
    padding-left: ${p => (p.paddingLeft ? p.paddingLeft : 0)};
    padding-bottom:2px
`;
export const RootDocketNumberRow = styled.View<{
  themeColor: IDOXLEThemeColor;
  horizontalAlign?: 'center' | 'flex-start' | 'flex-end';
  paddingLeft?: `${number}px`;
}>`
  width: 100%;
  height: 44px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
  background-color: ${p => p.themeColor.primaryContainerColor};
  display:flex;
  flex-direction:row;
  justify-content: ${p => (p.horizontalAlign ? p.horizontalAlign : 'center')}
  align-items:center;
  padding-left: ${p => (p.paddingLeft ? p.paddingLeft : 0)};
  overflow: hidden;

`;
export const StyledDocketStatusDisplayer = styled.View<{statusColor: string}>`
  width: 14px;
  height: 23px;
  background-color: ${p => p.statusColor};
  border-radius: 8px;
  margin-left: 8px;
`;
export const StyledDocketNumberText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.secondaryTitleFont};
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const RootDocketDataList = styled.ScrollView`
  height: 100%;
  width: 100%;
  z-index: 0;
`;
export const RootDocketDataRow = styled.View<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  height: 44px;
  display: flex;
  flex-direction: row;
  background-color: ${p => p.themeColor.primaryContainerColor};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
`;
export const StyledDocketDataCell = styled.View<{
  themeColor: IDOXLEThemeColor;
  horizontalAlign?: 'center' | 'flex-start' | 'flex-end';
  paddingLeft?: `${number}px`;
  widthInPixel: `${number}px`;
}>`
  width: ${p => p.widthInPixel};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${p => (p.horizontalAlign ? p.horizontalAlign : 'center')};
  padding-left: ${p => (p.paddingLeft ? p.paddingLeft : 0)};
  align-items: center;
  overflow: hidden;
`;
export const StyledDocketDataText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
  bgColor?: string;
  fontSize: `${number}px`;
}>`
  font-family: ${p => p.doxleFont.primaryFont};
  font-style: normal;
  font-weight: 400;
  font-size: ${p => p.fontSize};
  line-height: 16px;
  color: ${p => (p.bgColor ? 'rgba(0,0,0,1)' : p.themeColor.primaryFontColor)};
  padding: 2px 14px 2px 14px;
  border-radius: 12px !important;
  ${p =>
    p.bgColor
      ? `background-color:${p.bgColor};`
      : 'background-color:transparent;'}
  text-align:center;
  overflow: hidden;
`;
