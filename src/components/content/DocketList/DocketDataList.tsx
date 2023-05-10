import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootDocketDataList} from '../Inbox/StyledComponentInbox';
import {SyncedFlatlist} from '../GeneraComponents/SyncScrollViews/SyncedFlatList';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import {IDocket} from '../../../Models/docket';
import DocketDataRow from './DocketDataRow';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  StyledDocketListHeaderContainer,
  StyledDocketListHeaderText,
} from './StyledComponentDocketList';

type Props = {
  docketNumberListWidth: number;
};

const DocketDataList = ({docketNumberListWidth}: Props) => {
  //************ DOCKET PROVIDER ************* */
  const {
    docketTableHeaderList,
    docketList,
    hasNextPageDocketList,
    fetchNextPageDocketList,
  } = useDocket() as IDocketContextValue;

  //************END OF DOCKET PROVIDER ******** */

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */
  return (
    <RootDocketDataList
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <SyncedFlatlist
        idFlatlist={2}
        data={docketList}
        keyExtractor={(item, index) => (item as IDocket).docketPk}
        extraData={docketTableHeaderList}
        renderItem={({item, index}) => (
          <DocketDataRow
            docket={item}
            docketNumberListWidth={docketNumberListWidth}
          />
        )}
        initialNumToRender={18}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <StyledDocketListHeaderContainer
              widthInPixel={`${docketNumberListWidth}px`}
              themeColor={THEME_COLOR}
              horizontalAlign="flex-start"
              paddingLeft="8px"
            />

            {docketTableHeaderList.map((header, index) => (
              <StyledDocketListHeaderContainer
                widthInPixel={
                  header.docketKeyProp === 'docketName'
                    ? '200px'
                    : header.docketKeyProp === 'startDate' ||
                      header.docketKeyProp === 'endDate'
                    ? '200px'
                    : '120px'
                }
                horizontalAlign={
                  header.docketKeyProp === 'docketName'
                    ? 'flex-start'
                    : undefined
                }
                paddingLeft={
                  header.docketKeyProp === 'docketName' ? '30px' : undefined
                }
                themeColor={THEME_COLOR}
                key={`header#${index}`}>
                <StyledDocketListHeaderText
                  themeColor={THEME_COLOR}
                  doxleFont={DOXLE_FONT}>
                  {header.headerName}
                </StyledDocketListHeaderText>
              </StyledDocketListHeaderContainer>
            ))}
          </View>
        )}
        stickyHeaderIndices={[0]}
        bounces={false}
        onEndReached={() => {
          if (hasNextPageDocketList) fetchNextPageDocketList();
        }}
        onEndReachedThreshold={0.1}
      />
    </RootDocketDataList>
  );
};

export default DocketDataList;

const styles = StyleSheet.create({});
