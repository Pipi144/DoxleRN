//! THIS DOCKET TABLE IS WRAPPED INSIDE THE DOCKET PROVIDER
//! to use this component, it should be wrapped inside the Docket Provider

import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import {
  RootDocketList,
  StyledDocketListHeaderContainer,
  StyledDocketListHeaderText,
  StyledDocketNumberList,
} from './StyledComponentDocketList';
import DocketListSkeleton from './DocketListSkeleton';
import DocketNumberRow from './DocketNumberRow';
import {IDocket} from '../../../Models/docket';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import DocketDataList from './DocketDataList';

type Props = {};

const DocketList = (props: Props) => {
  //************ DOCKET PROVIDER ************* */
  const {
    docketList,
    isFetchingNextDocketList,
    isLoadingDocketList,
    isErrorFetchingDocketList,
    isSuccessFetchingDocketList,
  } = useDocket() as IDocketContextValue;

  //************END OF DOCKET PROVIDER ******** */

  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;

  const docketNumberListWidth = useMemo(
    () => (deviceSize.deviceWidth < 700 ? 100 : 144),
    [deviceSize],
  );
  //***********END OF ORIENTATION PROVIDER********* */

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */
  return (
    <RootDocketList>
      {isLoadingDocketList && <DocketListSkeleton />}
      {isSuccessFetchingDocketList && (
        <>
          <StyledDocketNumberList
            idFlatlist={1}
            data={docketList}
            renderItem={({item, index}) => <DocketNumberRow docket={item} />}
            keyExtractor={(item, index) => (item as IDocket).docketPk}
            widthInPixel={`${docketNumberListWidth}px`}
            ListHeaderComponent={() => (
              <StyledDocketListHeaderContainer
                widthInPixel={`${docketNumberListWidth}px`}
                themeColor={THEME_COLOR}
                horizontalAlign="flex-start"
                paddingLeft="8px">
                <StyledDocketListHeaderText
                  themeColor={THEME_COLOR}
                  doxleFont={DOXLE_FONT}>
                  Number
                </StyledDocketListHeaderText>
              </StyledDocketListHeaderContainer>
            )}
            stickyHeaderIndices={[0]}
            bounces={false}
          />

          <DocketDataList docketNumberListWidth={docketNumberListWidth} />
        </>
      )}
    </RootDocketList>
  );
};

export default DocketList;

const styles = StyleSheet.create({});
