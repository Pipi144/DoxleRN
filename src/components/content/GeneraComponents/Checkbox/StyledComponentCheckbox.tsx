import styled from 'styled-components/native';
import {IDOXLEThemeColor} from '../../../../Providers/DoxleThemeProvider';
import {NORMAL_CONTENT_FONT_FAMILY} from '../../../../Utilities/constants';

export const StyledCheckboxBase = styled.Pressable`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const StyledCheckboxLabelText = styled.Text<{
  themeColor: IDOXLEThemeColor;
}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: ${p => p.themeColor.primaryFontColor};
  text-transform: capitalize;
`;
