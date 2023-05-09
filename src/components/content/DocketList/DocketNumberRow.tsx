import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IDocket} from '../../../Models/docket';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootDocketNumberRow,
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

const DocketNumberRow = ({docket}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  //************ DOCKET PROVIDER ************* */
  const {docketStatusList, isSuccessFetchingStatus} =
    useDocket() as IDocketContextValue;

  //************END OF DOCKET PROVIDER ******** */
  return (
    <RootDocketNumberRow
      themeColor={THEME_COLOR}
      horizontalAlign="flex-start"
      paddingLeft="8px">
      <StyledDocketNumberText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
        #
        {docket.docketId.substring(
          docket.docketId.length - 3,
          docket.docketId.length,
        )}
      </StyledDocketNumberText>

      {isSuccessFetchingStatus && (
        <StyledDocketStatusDisplayer statusColor={docket.statusColor} />
      )}
    </RootDocketNumberRow>
  );
};

export default DocketNumberRow;

const styles = StyleSheet.create({});
