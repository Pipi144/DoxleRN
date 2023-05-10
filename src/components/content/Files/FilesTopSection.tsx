import React from 'react';
import {View} from 'react-native';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import InboxTopSection from '../Inbox/InboxTopSection';
import {FileIcon} from './FilesIcon';
import {
  FilesSubTitleText,
  StyledFilesTitleText,
  StyledFilesTopSection,
  StyledTopSectionFirstRow,
} from './StyledFiles';

type Props = {};

const FilesTopSection = (prop: Props) => {
  //************* AUTH PROVIDER *************** */
  const {accessToken, user} = useAuth() as authContextInterface;
  //**********END OF AUTH PROVIDER*********** */

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER************* */

  //***************** DOCKET PROVIDER ************ */
  const {docketQuote} = useDocket() as IDocketContextValue;
  //*********END OF DOCKET PROVIDER************* */

  const fileTitleText = 'All your files in one place';
  const fileSubTitleText = 'Current Storage: 513.67 MB';

  return (
    <StyledFilesTopSection>
      <StyledTopSectionFirstRow>
        <FileIcon />
        <StyledFilesTitleText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
          {fileTitleText}
        </StyledFilesTitleText>
      </StyledTopSectionFirstRow>
      <FilesSubTitleText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
        {fileSubTitleText}
      </FilesSubTitleText>
    </StyledFilesTopSection>
  );
};

export default FilesTopSection;
