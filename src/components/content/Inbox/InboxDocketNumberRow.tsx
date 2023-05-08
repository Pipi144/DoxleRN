import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IDocket} from '../../../Models/docket';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootInboxDocketNumberRow,
  StyledDocketNumberText,
  StyledDocketStatusDisplayer,
} from './StyledComponentInbox';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';

type Props = {
  docket: IDocket;
};

const InboxDocketNumberRow = ({docket}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  //************ DOCKET PROVIDER ************* */
  const {docketStatusList, isSuccessFetchingStatus} =
    useDocket() as IDocketContextValue;

  //************END OF DOCKET PROVIDER ******** */
  return (
    <RootInboxDocketNumberRow
      themeColor={THEME_COLOR}
      horizontalAlign="flex-start"
      paddingLeft="8px">
      <StyledDocketNumberText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
        #
        {docket.actionIdStr.substring(
          docket.actionIdStr.length - 3,
          docket.actionIdStr.length,
        )}
      </StyledDocketNumberText>

      {isSuccessFetchingStatus && (
        <StyledDocketStatusDisplayer statusColor={docket.statusColor} />
      )}
    </RootInboxDocketNumberRow>
  );
};

export default InboxDocketNumberRow;

const styles = StyleSheet.create({});
