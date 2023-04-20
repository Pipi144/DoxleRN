import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  RootTimelineWeeklyView,
  StyledProjectColumnContainer,
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
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import TimelineWeeklyViewProjectList from './TimelineWeeklyViewProjectList';
import {SyncScrollViewProvider} from '../GeneraComponents/SyncScrollViews/SyncScrollViewProvider';

type Props = {};

const TimelineWeeklyView = (props: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********************************************** */
  //******************* TIMELINE PROVIDER ************ */
  const {} = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //!PT: BELOW ARE THE SIZES USED FOR ANIMATION
  const maxWidthProjectColumn: number = useMemo(
    () =>
      deviceSize.deviceWidth < 600
        ? 0.5 * deviceSize.deviceWidth
        : deviceSize.deviceWidth > 800
        ? 0.36 * deviceSize.deviceWidth
        : 0.4 * deviceSize.deviceWidth,
    [deviceSize],
  );

  const minWidthProjectColumn: number = useMemo(
    () =>
      deviceSize.deviceWidth < 600
        ? 0.35 * deviceSize.deviceWidth
        : deviceSize.deviceWidth > 800
        ? 0.2 * deviceSize.deviceWidth
        : 0.3 * deviceSize.deviceWidth,
    [deviceSize],
  );

  //!SIZE FOR DATA CELL
  const dataWidthCell = deviceSize.deviceWidth < 600 ? 140 : 250; //!this var is used to set the width size of each data cell based ondevice width size
  const rowItemHeight = 30;
  //************************************************** */

  //$$$$$$$$$$$$$$$$$$$ HANDLE ANIMATION $$$$$$$$$$$$$$$$
  const horizontalScrollAnimatedValue = useSharedValue(0);
  const verticalScrollAnimatedValue = useSharedValue(0);
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
    <SyncScrollViewProvider>
      <RootTimelineWeeklyView>
        <StyledProjectColumnContainer
          insetBottom={deviceSize.insetBottom}
          style={projectColumnAnimatedStyle}>
          <TimelineWeeklyViewProjectList rowItemHeight={rowItemHeight} />
        </StyledProjectColumnContainer>
      </RootTimelineWeeklyView>
    </SyncScrollViewProvider>
  );
};

export default TimelineWeeklyView;

const styles = StyleSheet.create({});
