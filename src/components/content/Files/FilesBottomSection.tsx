import React from 'react';
import {FlatList, Text, View} from 'react-native';
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
  StyledFileBottomSection,
  StyledFilesDataRow,
  StyledFilesDataRowText,
  StyledFilesTitleText,
  StyledFilesTopSection,
  StyledTopSectionFirstRow,
} from './StyledFiles';

type Props = {};

const FilesBottomSection = (prop: Props) => {
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

  const temp = [
    {
      id: 1,
      name: 'Shop Drawings',
    },
    {
      id: 2,
      name: 'Quotes',
    },
    {
      id: 3,
      name: 'Working Drawings.pdf',
    },
  ];

  return (
    <StyledFileBottomSection>
      <FlatList
        data={temp}
        // numColumns={1}
        style={{width: '100%', height: '100%'}}
        renderItem={({item, index}) => (
          <StyledFilesDataRow>
            <StyledFilesDataRowText
              themeColor={THEME_COLOR}
              doxleFont={DOXLE_FONT}>
              {item.name}
            </StyledFilesDataRowText>
          </StyledFilesDataRow>
        )}
      />
    </StyledFileBottomSection>
  );
};

export default FilesBottomSection;
