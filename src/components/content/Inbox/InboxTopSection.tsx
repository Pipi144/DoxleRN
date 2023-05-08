import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootInboxTopSection,
  StyledInboxSubTitleText,
  StyledInboxTitleText,
  StyledInputSearchWrapper,
  StyledSearchInput,
} from './StyledComponentInbox';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';

type Props = {};

const InboxTopSection = (props: Props) => {
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
  return (
    <RootInboxTopSection>
      {user ? (
        <StyledInboxTitleText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
          {`${user.firstName} ${user.lastName}'s Inbox`}
        </StyledInboxTitleText>
      ) : null}

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
    </RootInboxTopSection>
  );
};

export default InboxTopSection;

const styles = StyleSheet.create({});
