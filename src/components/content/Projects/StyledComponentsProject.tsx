import styled from 'styled-components/native';
import {
  IDOXLEThemeColor,
  IDoxleFont,
} from '../../../Providers/DoxleThemeProvider';
import {Input} from 'native-base';
import Animated from 'react-native-reanimated';
import {IconButton} from 'react-native-paper';

export const RootProjects = styled.View<{themeColor: IDOXLEThemeColor}>`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
`;
export const RootProjectTopSection = styled.View`
  margin-top: 30px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const StyledInputSearchWrapper = styled.View`
  width: 100%;
  max-width: 800px;
  height: 30px;
  background-color: #e3e5eb;
  border-radius: 13px;
  align-self: center;
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
export const StyledProjectContent = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledProjectAddressContainer = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;
export const StyledProjectAddressText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.primaryFont};
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 30px;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const StyledProjectDropdownIconContainer = styled(Animated.View)`
  margin-left: 4px;
`;
export const RootProjectListBottomModal = styled.View<{
  themeColor: IDOXLEThemeColor;
  paddingBottom: number;
  heightInPixel: `${number}px`;
}>`
  height: ${p => p.heightInPixel};
  width: 100%;
  background-color: ${p => p.themeColor.primaryContainerColor};

  padding-bottom: ${p => p.paddingBottom}px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 1px 12px 12px ${p => p.themeColor.primaryReverseBackdropColor};
  display: flex;
  flex-direction: column;
`;
export const StyledProjectListTitleContainer = styled.View<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
`;
export const StyledProjectListTitleText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.secondaryFont};
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  color: ${p => p.themeColor.primaryReverseFontColor};
  text-transform: uppercase;
`;
export const StyledProjectList = styled.FlatList`
  flex: 1;
  width: 100%;
`;
export const RootProjectListItem = styled(Animated.View)<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 100%;
  height: 44px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${p => p.themeColor.primaryDividerColor};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledProjectItemAddressText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  selected: boolean;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.secondaryFont};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${p =>
    p.selected ? p.themeColor.doxleColor : p.themeColor.primaryFontColor};
  padding-left: 14px;
`;
export const StyledProjectMenuContainer = styled.View<{
  widthInPixel: `${number}px`;
}>`
  max-width: ${p => p.widthInPixel};
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StyledProjectMenuIconBtn = styled(IconButton)`
  padding: 2px !important;
  display: flex;
  margin: 0;
`;
export const StyledProjectMenuList = styled.FlatList`
  flex: 1;
  margin-right: 8px;
`;
export const StyledProjectMenuItem = styled(Animated.View)`
  min-width: 96px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background-color: #e3e5eb;
  border-radius: 13px;
  margin-right: 4px;
`;
export const StyledProjectMenuItemText = styled.Text<{
  themeColor: IDOXLEThemeColor;
  selected: boolean;
  doxleFont: IDoxleFont;
}>`
  font-family: ${p => p.doxleFont.primaryFont};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${p =>
    p.selected ? p.themeColor.doxleColor : p.themeColor.primaryFontColor};
`;
