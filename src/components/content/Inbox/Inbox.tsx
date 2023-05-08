import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import InboxTopSection from './InboxTopSection';
import {
  RootInbox,
  StyledDocketInboxContentDisplayer,
  StyledDocketListHeaderContainer,
  StyledDocketListHeaderText,
  StyledDocketNumberList,
} from './StyledComponentInbox';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import InboxListSkeleton from './InboxListSkeleton';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import DocketNumberRow from './DocketNumberRow';
import {IDocket} from '../../../Models/docket';
import DocketDataList from './DocketDataList';

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
    <RootInbox themeColor={THEME_COLOR}>
      <InboxTopSection />

      <StyledDocketInboxContentDisplayer>
        {isLoadingDocketList && <InboxListSkeleton />}
        {isSuccessFetchingDocketList && (
          <>
            <StyledDocketNumberList
              idFlatlist={1}
              data={docketList}
              renderItem={({item, index}) => <DocketNumberRow docket={item} />}
              keyExtractor={(item, index) => (item as IDocket).actionId}
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
      </StyledDocketInboxContentDisplayer>
    </RootInbox>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
