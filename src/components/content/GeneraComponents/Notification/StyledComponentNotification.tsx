import styled from 'styled-components/native';
import {NORMAL_CONTENT_FONT_FAMILY} from '../../../../Utilities/constants';

export const StyledTextContainer = styled.View<{width: string}>`
  width: ${p => p.width};

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  align-items: center;
`;
export const StyledImageContainer = styled.View`
  height: 100%;
  width: 20%;r
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledTitleText = styled.Text<{color: string}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: ${p => p.color};
  text-transform: capitalize;
`;
export const StyledDescriptionText = styled.Text<{color: string}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: ${p => p.color};
  text-transform: capitalize;
`;
export const StyledURLLinkText = styled.Text`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: lightblue;
  text-transform: capitalize;
  text-decoration-line: underline;
`;
export const StyledTitleNotificationWithURLText = styled.Text<{color: string}>`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${p => p.color};
  text-transform: capitalize;
`;
