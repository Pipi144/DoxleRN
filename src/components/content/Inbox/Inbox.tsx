import {StyleSheet} from 'react-native';
import React from 'react';
import InboxTopSection from './InboxTopSection';
import {
  RootInbox,
  StyledDocketInboxContentDisplayer,
} from './StyledComponentInbox';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import DocketList from '../DocketList/DocketList';

type Props = {
  navigation: any;
};

const Inbox = ({navigation}: Props) => {
  //************ DOCKET PROVIDER ************* */
  const {
    docketList,
    isFetchingNextDocketList,
    isLoadingDocketList,
    isErrorFetchingDocketList,
    isSuccessFetchingDocketList,
  } = useDocket() as IDocketContextValue;

  //************END OF DOCKET PROVIDER ******** */

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */
  return (
    <RootInbox themeColor={THEME_COLOR}>
      <InboxTopSection />

      <StyledDocketInboxContentDisplayer>
        <DocketList />
      </StyledDocketInboxContentDisplayer>
    </RootInbox>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
