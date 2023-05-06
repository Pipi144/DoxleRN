import styled from 'styled-components/native';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
import {Button, Popover} from 'native-base';

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
  height: 31px;
  background: #7070ff;
  border-radius: 9px;
  font-family: 'WorkSans-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.05em;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 14px !important;
  text-transform: uppercase;
`;
export const StyledCompanyMenuTitle = styled(Popover.Header)<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: 'WorkSans-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 32px;
  letter-spacing: 0.05em;

  color: #ffffff;
`;
