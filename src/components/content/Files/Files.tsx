import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StyledFilesContainer} from './StyledFiles';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import FilesTopSection from './FilesTopSection';
import FilesBottomSection from './FilesBottomSection';

type Props = {
  navigation: any;
};

const Files = ({navigation}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  return (
    <StyledFilesContainer themeColor={THEME_COLOR}>
      <FilesTopSection />
      <FilesBottomSection />
    </StyledFilesContainer>
  );
};

export default Files;
