import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootTimelineWeeklyViewWeekDayList,
  StyledProjectTimelineDataList,
  StyledWeeklyViewHeaderCell,
  StyledWeeklyViewHeaderText,
} from './StyledComponentDocketTimeline';
import {SharedValue} from 'react-native-reanimated';
import {
  IDocketTimelineContext,
  displayedDays,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';

type Props = {
  horizontalScrollAnimatedValue: SharedValue<number>;
  verticalScrollAnimatedValue: SharedValue<number>;
  maxWidthProjectColumn: number;
  minWidthProjectColumn: number;
  rowItemHeight: number;
};

const TimelineWeeklyViewWeekDayList = ({
  horizontalScrollAnimatedValue,
  verticalScrollAnimatedValue,
  maxWidthProjectColumn,
  minWidthProjectColumn,
  rowItemHeight,
}: Props) => {
  //******************* TIMELINE PROVIDER ************ */
  const {projects} = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  return (
    <RootTimelineWeeklyViewWeekDayList
      idScrollViews={4}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <StyledProjectTimelineDataList
        idFlatlist={2}
        data={projects}
        ListHeaderComponent={() => (
          <View style={{flexDirection: 'row'}}>
            <StyledWeeklyViewHeaderCell
              horizontalAlign="flex-start"
              width={`${maxWidthProjectColumn}px`}
              cellHeight={`${rowItemHeight}px`}></StyledWeeklyViewHeaderCell>

            {displayedDays.map((weekDay, idx) => (
              <StyledWeeklyViewHeaderCell
                key={`header#${idx}`}
                horizontalAlign="center"
                width={`${maxWidthProjectColumn}px`}
                cellHeight={`${rowItemHeight}px`}>
                <StyledWeeklyViewHeaderText>
                  {weekDay.weekDayFullName}
                </StyledWeeklyViewHeaderText>
              </StyledWeeklyViewHeaderCell>
            ))}
          </View>
        )}
        stickyHeaderIndices={[0]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <></>}
      />
    </RootTimelineWeeklyViewWeekDayList>
  );
};

export default TimelineWeeklyViewWeekDayList;

const styles = StyleSheet.create({});
