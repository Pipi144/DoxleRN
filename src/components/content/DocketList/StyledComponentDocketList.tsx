import styled from 'styled-components/native';
import {SyncedFlatlist} from '../GeneraComponents/SyncScrollViews/SyncedFlatList';
import {
  IDOXLEThemeColor,
  IDoxleFont,
} from '../../../Providers/DoxleThemeProvider';
import Animated from 'react-native-reanimated';

export const RootDocketList = styled.View`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
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

export const StyledDocketListHeaderContainer = styled.View<{
  widthInPixel: `${number}px`;
  horizontalAlign?: 'center' | 'flex-start' | 'flex-end';
  paddingLeft?: `${number}px`;
  themeColor: IDOXLEThemeColor;
}>`
      width: ${p => p.widthInPixel};
      display:flex;
      flex-direction:row;
      justify-content: ${p =>
        p.horizontalAlign ? p.horizontalAlign : 'center'}
      align-items:center;
      background-color: ${p => p.themeColor.primaryBackgroundColor};
      padding-left: ${p => (p.paddingLeft ? p.paddingLeft : 0)};
      padding-bottom:2px
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
export const StyledDocketStatusDisplayer = styled.View<{statusColor: string}>`
  width: 14px;
  height: 23px;
  background-color: ${p => p.statusColor};
  border-radius: 8px;
  margin-left: 8px;
`;
export const StyledEmptyListPlaceHolder = styled.View`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledEmptyListPlaceHolderText = styled.Text<{
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

export const StyledLoadingMoreContainer = styled(Animated.View)<{
  insetBottom: number;
}>`
  width: 100%;
  height: 100px;
  padding-bottom: ${p => p.insetBottom}px;
  position: absolute;
  left: 0;
  bottom: 0;
`;
