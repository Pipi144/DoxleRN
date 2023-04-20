import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootTimelineWeeklyViewProjectList,
  StyledWeeklyViewHeaderCell,
  StyledWeeklyViewHeaderText,
} from './StyledComponentDocketTimeline';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import TimelineWeeklyViewProjectRow from './TimelineWeeklyViewProjectRow';
import {ISimpleProjectTimeline} from '../../../Models/project';
import {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  rowItemHeight: number;
  maxWidthProjectColumn: number;
  minWidthProjectColumn: number;
  horizontalScrollAnimatedValue: SharedValue<number>;
  verticalScrollAnimatedValue: SharedValue<number>;
};

const TimelineWeeklyViewProjectList = ({
  rowItemHeight,
  maxWidthProjectColumn,
  minWidthProjectColumn,
  horizontalScrollAnimatedValue,
  verticalScrollAnimatedValue,
}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********************************************** */
  //******************* TIMELINE PROVIDER ************ */
  const {projects} = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //************************************************** */
  //$$$$$$$$$$$$$$$$$$$ HANDLE ANIMATION $$$$$$$$$$$$$$$$

  const projectColumnAnimatedStyle = useAnimatedStyle(() => {
    const widthInterPolate =
      deviceSize.deviceWidth < 600
        ? interpolate(
            horizontalScrollAnimatedValue.value,
            [0, 140],
            [maxWidthProjectColumn, minWidthProjectColumn],
            {
              extrapolateLeft: Extrapolation.CLAMP,
              extrapolateRight: Extrapolation.CLAMP,
            },
          )
        : interpolate(
            horizontalScrollAnimatedValue.value,
            [0, 140],
            [maxWidthProjectColumn, minWidthProjectColumn],
            {
              extrapolateLeft: Extrapolation.CLAMP,
              extrapolateRight: Extrapolation.CLAMP,
            },
          );

    return {
      width: widthInterPolate,
    };
  }, [horizontalScrollAnimatedValue]);
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <RootTimelineWeeklyViewProjectList
      style={projectColumnAnimatedStyle}
      idFlatlist={1}
      scrollAnimatedValue={verticalScrollAnimatedValue}
      data={projects}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <StyledWeeklyViewHeaderCell
          horizontalAlign="flex-start"
          width="100%"
          cellHeight={`${rowItemHeight}px`}>
          <StyledWeeklyViewHeaderText>Projects</StyledWeeklyViewHeaderText>
        </StyledWeeklyViewHeaderCell>
      )}
      stickyHeaderIndices={[0]}
      bounces={false}
      renderItem={({item, index}) => (
        <TimelineWeeklyViewProjectRow
          project={item}
          rowItemHeight={rowItemHeight}
        />
      )}
      keyExtractor={(item, idx) =>
        `${(item as ISimpleProjectTimeline).projectId}`
      }
      extraData={projects}
    />
  );
};

export default TimelineWeeklyViewProjectList;

const styles = StyleSheet.create({});
