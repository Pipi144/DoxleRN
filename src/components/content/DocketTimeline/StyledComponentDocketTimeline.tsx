import styled from 'styled-components/native';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
import {Button, Checkbox, Input} from 'native-base';
import {IDeviceSize} from '../../../Providers/OrientationContext';
import {
  IBM_PLEX_MONO_REG,
  NORMAL_CONTENT_FONT_FAMILY,
} from '../../../Utilities/constants';
import Animated from 'react-native-reanimated';

export const RootDocketTimeline = styled(Animated.View)<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
`;

export const StyledTopBanner = styled.View<{
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
export const StyledVersionDoxleText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const StyledDownloadDoxleButton = styled(Button)`
  width: 112px;
  height: 24px;
  background: #7b7bfe;
  border-radius: 13px;
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  color: #ffffff;
  padding: 0 !important;
`;
export const StyledDocketTimelineMainContainer = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const RootDocketTimelineTop = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 14px;
`;
export const StyledTimelineTextContainer = styled.View`
  padding-left: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledTimelineTitleText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 27px;
  color: ${p => p.themeColor.primaryFontColor};
  text-transform: capitalize;
`;
export const StyledPeriodMenu = styled.View`
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StyledPeriodMenuItemButton = styled.Pressable`
  width: 100px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 13px;
  overflow: hidden;
  position: relative;
`;
export const StyledPeriodMenuItemText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${p => p.themeColor.primaryFontColor};
  text-transform: capitalize;
  z-index: 1;
`;
export const StyledSelectedPeriodMenuItemAnimatedMask = styled(Animated.View)<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${p => p.themeColor.primaryContainerColor};
  z-index: 0;
`;
export const StyledSearchInput = styled(Input)`
  font-family: ${IBM_PLEX_MONO_REG};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`;
export const StyledInputSearchWrapper = styled.View`
  width: 80%;
  max-width: 800px;
  height: 30px;
  background-color: #e3e5eb;
  border-radius: 13px;
  align-self: center;
  margin-top: 8px;
  margin-bottom: 50px;
`;
export const StyledTopMenuButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;
export const StyledTopMenuButton = styled(Button)<{
  bgColor: string;
}>`
  padding: 0;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;

  background-color: ${p => p.bgColor};
  width: 82px;
  height: 24px;
  border-radius: 3px;
  margin-right: 4px;
  text-transform: none;
`;
export const StyledLoadingMaskContainer = styled(Animated.View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
`;
export const StyledErrorScreenContainer = styled(Animated.View)`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledErrorText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: ${IBM_PLEX_MONO_REG};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const RootTimelineMonthlyViewList = styled(Animated.FlatList)`
  flex: 1;
  width: 100%;

  margin-top: 8px;
`;
export const RootTimelineMonthlyViewListItem = styled(Animated.View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding: 0px 4px;
  min-height: 100px;
`;
export const StyledMonthlyViewProjectAddressText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  color: ${p => p.themeColor.primaryFontColor};
  text-transform: capitalize;
`;
export const StyledMonthlyViewListItemHorizontalList = styled.ScrollView`
  width: 100%;
  margin-top: 8px;
`;
export const StyledMonthlyViewWeekDayHeader = styled.View<{
  widthInPixel: number;
}>`
  padding-left: 4px;
  width: ${p => p.widthInPixel + 4}px;
`;
export const StyledMonthlyViewWeekDayHeaderText = styled.Text`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
  color: #9696f3;
`;
export const RootMonthlyViewDateCellItem = styled.View<{
  themeColor: IDOXLEThemeColor;
  cellSize: number;
}>`
  margin: 2px;
  height: ${p => p.cellSize}px;
  width: ${p => p.cellSize}px;
  background-color: ${p => p.themeColor.primaryContainerColor};
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
`;
export const StyledCellItemDateText = styled.Text<{textColor: string}>`
  font-family: ${IBM_PLEX_MONO_REG};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${p => p.textColor};
`;
