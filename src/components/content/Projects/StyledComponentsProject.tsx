import styled from 'styled-components/native';
import {
  IDOXLEThemeColor,
  IDoxleFont,
} from '../../../Providers/DoxleThemeProvider';
import {Input} from 'native-base';

export const RootProjects = styled.View<{themeColor: IDOXLEThemeColor}>`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${p => p.themeColor.primaryBackgroundColor};
`;
export const RootProjectTopSection = styled.View`
  margin-top: 4px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
