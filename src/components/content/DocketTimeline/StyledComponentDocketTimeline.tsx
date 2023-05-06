import styled from 'styled-components/native';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
import {Button, Checkbox, Input} from 'native-base';
import {IDeviceSize} from '../../../Providers/OrientationContext';
import {
  IBM_PLEX_MONO_REG,
  MENU_TITLE_FONT_SEMIBOLD,
  NORMAL_CONTENT_FONT_FAMILY,
} from '../../../Utilities/constants';
import Animated from 'react-native-reanimated';
import {SyncedFlatlist} from '../GeneraComponents/SyncScrollViews/SyncedFlatList';
import {SyncedScrollView} from '../GeneraComponents/SyncScrollViews/SyncedScrollView';

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

export const StyledDocketTimelineMainContainer = styled.View<{
  insetBottom: number;
}>`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: ${p => p.insetBottom}px;
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
  border-radius: 13px;
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
export const StyledLoadingMaskContainer = styled(Animated.View)<{
  opacityBackdrop?: `0.${IntRange<0, 10>}`;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(
    255,
    255,
    255,
    ${p => (p.opacityBackdrop ? p.opacityBackdrop : 0.7)}
  );
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
export const RootTimelineMonthlyViewList = styled.FlatList`
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
  z-index: 2;
`;
export const RootEditTimelineMenu = styled.View<{
  themeColor: IDOXLEThemeColor;
  paddingBottom: number;
}>`
  height: 500px;
  width: 100%;
  background-color: ${p => p.themeColor.primaryContainerColor};

  padding-bottom: ${p => p.paddingBottom}px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 1px 12px 12px ${p => p.themeColor.primaryReverseBackdropColor};
  display: flex;
  flex-direction: column;
`;
export const StyledTopTitleEditTimelineMenu = styled.View<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;
export const StyledTopTitleText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: ${MENU_TITLE_FONT_SEMIBOLD};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: ${p => p.themeColor.primaryFontColor};
  text-transform: capitalize;
`;
export const StyledCloseMenuButton = styled.Pressable`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledEditTimelineMenuBody = styled(Animated.ScrollView)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const StyledEditTimelineMenuFieldContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 8px;
  margin-bottom: 14px;
  padding-horizontal: 8px;
`;
export const StyledEditTimelineMenuFieldLabel = styled.Text`
  margin-bottom: 4px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.15px;
  line-height: 15px;
  text-transform: capitalize;
`;
export const StyledEditTimelineModalTextInput = styled.TextInput`
  width: 100%;
  padding: 4px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 14px;
  border: 0.5px solid grey;
  border-radius: 4px;
  max-width: 300px;
  height: 44px;
`;
export const StyledEditTimelineMenuControlButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-horizontal: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`;
export const StyledEditTimelineMenuControlButton = styled(Animated.View)<{
  bgColor?: string;
  marginRight?: number;
}>`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  ${p => p.bgColor && `background-color: ${p.bgColor};`}

  margin-right: ${p => (p.marginRight ? p.marginRight : 0)}px;
  flex-direction: row;
`;

export const StyledPressableMask = styled.Pressable`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const StyledControlButtonText = styled.Text<{textColor: string}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 14px;
  color: ${p => p.textColor};
  text-transform: capitalize;
`;

export const RootTimelineWeeklyView = styled.View<{insetBottom: number}>`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin-top: 8px;
  padding-bottom: ${p => p.insetBottom}px;
  overflow: hidden;
`;
export const RootTimelineWeeklyViewProjectList = styled(SyncedFlatlist)`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const StyledWeeklyViewHeaderCell = styled.View<{
  horizontalAlign: 'flex-start' | 'center';
  width: `${number}px` | `${number}%`;
  cellHeight: `${number}px`;
}>`
  width: ${p => p.width};
  height: ${p => p.cellHeight};
  display: flex;
  justify-content: center;
  align-items: ${p => p.horizontalAlign};
  padding-left: ${p => (p.horizontalAlign === 'flex-start' ? 14 : 0)}px;
  background-color: rgba(125, 164, 255, 0.3);
`;
export const StyledWeeklyViewHeaderText = styled.Text`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  text-transform: capitalize;
`;
export const RootTimelineWeeklyViewProjectRow = styled.Pressable<{
  rowHeight: `${number}px`;
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: ${p => p.rowHeight};
  background-color: ${p => p.themeColor.primaryContainerColor};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-horizontal: 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
  border-bottom-style: solid;
  border-right-width: 1px;
  border-right-color: ${p => p.themeColor.primaryDividerColor};
  border-right-style: solid;
`;
export const StyledWeeklyViewProjectAddressText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${p => p.themeColor.primaryFontColor};
  width: 100%;
`;
export const RootTimelineWeeklyViewDataList = styled(SyncedScrollView)`
  width: 100%;
  height: 100%;
  z-index: 0;
`;
export const StyledProjectTimelineDataList = styled(SyncedFlatlist)`
  height: 100%;
`;
export const RootTimelineWeeklyViewDataRow = styled(Animated.View)<{
  rowHeight: `${number}px`;
  themeColor: IDOXLEThemeColor;
}>`
  height: ${p => p.rowHeight};
  display: flex;
  flex-direction: row;
  background-color: ${p => p.themeColor.primaryContainerColor};
  border-bottom-width: 1px;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
  border-bottom-style: solid;
`;
export const StyledTimelineWeeklyViewDataCell = styled.View<{
  width: `${number}px`;
  themeColor: IDOXLEThemeColor;
}>`
  border-left-width: 1px;
  border-left-color: ${p => p.themeColor.primaryDividerColor};
  border-left-style: solid;
  width: ${p => p.width};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
`;
export const StyledEditProjectAddressTextInputContainer = styled(
  Animated.View,
)<{themeColor: IDOXLEThemeColor}>`
  width: 100%;
  height: 20px;
  border-bottom-color: #7b7bfe;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
`;

export const StyledProjectAddressTextPressableWrapper = styled.Pressable`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledEditProjectAddressTextInput = styled.TextInput`
  padding-left: 4px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  flex: 1;
  height: 100%;
`;
export const StyledEditProjectAddressControlBtn = styled.Pressable<{
  bgColor: string;
}>`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  background-color: ${p => p.bgColor};
`;
export const RootAddTimelineModal = styled.View<{
  themeColor: IDOXLEThemeColor;
  paddingBottom: number;
}>`
  height: 500px;
  width: 100%;
  background-color: ${p => p.themeColor.primaryContainerColor};

  padding-bottom: ${p => p.paddingBottom}px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 1px 12px 12px ${p => p.themeColor.primaryReverseBackdropColor};
  display: flex;
  flex-direction: column;
`;

export const StyledTopTitleAddTimelineModal = styled.View<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;
export const StyledAddTimelineModalBody = styled(Animated.ScrollView)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const StyledAddTimelineModalFieldContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 8px;
  margin-bottom: 14px;
  padding-horizontal: 8px;
`;
export const StyledAddTimelineModalFieldLabel = styled.Text`
  margin-bottom: 4px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.15px;
  line-height: 15px;
  text-transform: capitalize;
`;
export const StyledAddTimelineModalTextInput = styled.TextInput`
  width: 100%;
  padding: 4px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 14px;
  border: 0.5px solid grey;
  border-radius: 4px;
  max-width: 300px;
  height: 44px;
`;

export const StyledAddTimelineMenuControlButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-horizontal: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`;
export const StyledAddTimelineMenuControlButton = styled(Animated.View)<{
  bgColor?: string;
  marginRight?: number;
}>`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  ${p => p.bgColor && `background-color: ${p.bgColor};`}

  margin-right: ${p => (p.marginRight ? p.marginRight : 0)}px;
  flex-direction: row;
`;
export const StyledAddTimelineModalDataText = styled.Text`
  margin-bottom: 4px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  letter-spacing: 0.15px;
  line-height: 14px;
  text-transform: capitalize;
  padding-left: 14px;
`;
export const StyledEmptyInputPrompt = styled(Animated.Text)`
  font-family: ${IBM_PLEX_MONO_REG};
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 0.15px;
  line-height: 12px;
  text-transform: capitalize;
  color: red;
`;
export const StyledCellItemDateTextPressableMask = styled.Pressable`
  width: 100%;
  position: relative;
  padding-horizontal: 2px;
`;
export const StyledDateAnimatedMask = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(95, 95, 219, 0.4);
`;
