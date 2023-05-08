import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootProjectTopSection,
  StyledInboxSubTitleText,
  StyledInputSearchWrapper,
  StyledSearchInput,
} from './StyledComponentsProject';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';

type Props = {};

const ProjectTopSection = (props: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  //***************** DOCKET PROVIDER ************ */
  const {docketQuote} = useDocket() as IDocketContextValue;
  //*********END OF DOCKET PROVIDER************* */

  return (
    <RootProjectTopSection>
      <StyledInboxSubTitleText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
        {docketQuote}
      </StyledInboxSubTitleText>
      <StyledInputSearchWrapper>
        <StyledSearchInput
          placeholder="Search"
          borderWidth={0}
          _focus={{
            backgroundColor: 'transparent',
          }}
          height={'100%'}
          themeColor={THEME_COLOR}
          doxleFont={DOXLE_FONT}
        />
      </StyledInputSearchWrapper>
    </RootProjectTopSection>
  );
};

export default ProjectTopSection;

const styles = StyleSheet.create({});
