import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IDocket} from '../../../Models/docket';

import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import {formatDate, formatter} from '../../../Utilities/FunctionUtilities';
import {
  RootDocketDataRow,
  StyledDocketDataCell,
  StyledDocketDataText,
} from './StyledComponentDocketList';

type Props = {
  docket: IDocket;
  docketNumberListWidth: number;
};

const DocketDataRow = ({docket, docketNumberListWidth}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  //************ DOCKET PROVIDER ************* */
  const {docketTableHeaderList, docketList} =
    useDocket() as IDocketContextValue;

  //************END OF DOCKET PROVIDER ******** */

  return (
    <RootDocketDataRow themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
      <StyledDocketDataCell
        widthInPixel={`${docketNumberListWidth}px`}
        themeColor={THEME_COLOR}
      />

      {docketTableHeaderList.map((header, index) => {
        if (header.isDisplayed)
          return (
            <StyledDocketDataCell
              widthInPixel={
                header.docketKeyProp === 'docketName'
                  ? '200px'
                  : header.docketKeyProp === 'startDate' ||
                    header.docketKeyProp === 'endDate'
                  ? '200px'
                  : '120px'
              }
              horizontalAlign={
                header.docketKeyProp === 'docketName' ? 'flex-start' : undefined
              }
              themeColor={THEME_COLOR}
              key={`cell#${docket.docketPk}#${index}`}>
              {header.docketKeyProp === 'docketName' && (
                <StyledDocketDataText
                  themeColor={THEME_COLOR}
                  doxleFont={DOXLE_FONT}
                  fontSize="14px"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {docket[header.docketKeyProp]}
                </StyledDocketDataText>
              )}
              {(header.docketKeyProp === 'startDate' ||
                header.docketKeyProp === 'endDate') &&
                docket[header.docketKeyProp] && (
                  <StyledDocketDataText
                    themeColor={THEME_COLOR}
                    doxleFont={DOXLE_FONT}
                    fontSize="14px"
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {formatDate(
                      docket[header.docketKeyProp] as string,
                      'dd MonthName yyyy',
                    )}
                  </StyledDocketDataText>
                )}

              {header.headerName !== 'Name' &&
                header.headerName !== 'Start' &&
                header.headerName !== 'End' &&
                docket[header.docketKeyProp] && (
                  <StyledDocketDataText
                    themeColor={THEME_COLOR}
                    doxleFont={DOXLE_FONT}
                    bgColor={
                      header.headerName === 'Budget'
                        ? ' rgba(255, 186, 53, 0.8)'
                        : header.headerName === 'Xero'
                        ? 'rgba(164, 200, 255, 0.8)'
                        : header.headerName === 'Running'
                        ? '#7070EF'
                        : '#12B718'
                    }
                    fontSize="13px">
                    {docket[header.docketKeyProp]
                      ? formatter.format(
                          parseFloat(docket[header.docketKeyProp]!.toString()),
                        )
                      : '$0.00'}
                  </StyledDocketDataText>
                )}
            </StyledDocketDataCell>
          );
      })}
    </RootDocketDataRow>
  );
};

export default DocketDataRow;

const styles = StyleSheet.create({});
