import styled from 'styled-components/native';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
import {Button} from 'native-base';

export const RootCompanyTopMenu = styled.View<{
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
export const StyledDoxleYearText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${p => p.themeColor.primaryFontColor};
`;
export const StyledCompanyDisplayerButton = styled(Button)<{
  themeColor: IDOXLEThemeColor;
}>`
  width: 68px;
  height: 23px;
  background: #7070ff;
  border-radius: 9px;
`;
