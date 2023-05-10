import {StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: any;
};

const Inbox = ({navigation}: Props) => {
  //################## STATES #################
  const [isFocused, setIsFocused] = useState<boolean>(false); //!used to optimised react navigation due to long switching screen time
  //###########################################

  console.log('RENDER IB');
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, []),
  );
  if (isFocused)
    return (
      <RootInbox themeColor={THEME_COLOR}>
        <InboxTopSection />

        <StyledDocketInboxContentDisplayer>
          <DocketList />
        </StyledDocketInboxContentDisplayer>
      </RootInbox>
    );
  else return <></>;
};

export default React.memo(Inbox);

const styles = StyleSheet.create({});
