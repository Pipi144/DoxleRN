import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootTimelineWeeklyViewDataList,
  StyledProjectTimelineDataList,
  StyledWeeklyViewHeaderCell,
  StyledWeeklyViewHeaderText,
} from './StyledComponentDocketTimeline';
import {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  IDocketTimelineContext,
  displayedDays,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import TimelineWeeklyViewDataRow from './TimelineWeeklyViewDataRow';
import {ISimpleProject} from '../../../Models/project';
import {convertWeekDaysValueToText} from '../../../Utilities/FunctionUtilities';
import {TimelineDocket} from '../../../Models/DocketTimelineModel';
import {DocketTimelineUpdateBody} from '../../../service/DoxleAPI/QueryHookAPI/timelineQueryAPI';

type Props = {
  horizontalScrollAnimatedValue: SharedValue<number>;
  verticalScrollAnimatedValue: SharedValue<number>;
  maxWidthProjectColumn: number;
  minWidthProjectColumn: number;
  rowItemHeight: number;
};

const TimelineWeeklyViewDataList = ({
  horizontalScrollAnimatedValue,
  verticalScrollAnimatedValue,
  maxWidthProjectColumn,
  minWidthProjectColumn,
  rowItemHeight,
}: Props) => {
  //******************* TIMELINE PROVIDER ************ */
  const {projects, dockets, currentWeekDays, filterDocketWithProject} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */

  //#################HANLDE ANIMATION###########################
  const dataColumnListAnimatedStyled = useAnimatedStyle(() => {
    const scaleYInterpolate = interpolate(
      horizontalScrollAnimatedValue.value,
      [-60, -1],
      [1.2, 1],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [{scaleY: scaleYInterpolate}],
    };
  }, [horizontalScrollAnimatedValue]);

  //##############################################################
  return (
    <RootTimelineWeeklyViewDataList
      idScrollViews={4}
      horizontal={true}
      scrollAnimatedValue={horizontalScrollAnimatedValue}
      showsHorizontalScrollIndicator={false}>
      <StyledProjectTimelineDataList
        idFlatlist={2}
        data={projects}
        initialNumToRender={6}
        removeClippedSubviews={true}
        style={[dataColumnListAnimatedStyled]}
        scrollAnimatedValue={verticalScrollAnimatedValue}
        ListHeaderComponent={() => (
          <View style={{flexDirection: 'row'}}>
            <StyledWeeklyViewHeaderCell
              horizontalAlign="flex-start"
              width={`${maxWidthProjectColumn}px`}
              cellHeight={`${rowItemHeight}px`}></StyledWeeklyViewHeaderCell>

            {currentWeekDays.map((weekDay, idx) => (
              <StyledWeeklyViewHeaderCell
                key={`header#${idx}`}
                horizontalAlign="center"
                width={`${maxWidthProjectColumn}px`}
                cellHeight={`${rowItemHeight}px`}>
                <StyledWeeklyViewHeaderText>
                  {convertWeekDaysValueToText(
                    new Date(weekDay.fullDay).getDay(),
                    'full',
                  )}
                </StyledWeeklyViewHeaderText>
              </StyledWeeklyViewHeaderCell>
            ))}
          </View>
        )}
        stickyHeaderIndices={[0]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TimelineWeeklyViewDataRow
            project={item}
            rowItemHeight={rowItemHeight}
            maxWidthProjectColumn={maxWidthProjectColumn}
            matchedDockets={filterDocketWithProject(item, dockets)}
          />
        )}
        keyExtractor={(item, idx) =>
          `row#${(item as ISimpleProject).projectId}`
        }
        extraData={{projects, dockets}}
      />
    </RootTimelineWeeklyViewDataList>
  );
};

export default TimelineWeeklyViewDataList;

const styles = StyleSheet.create({});
