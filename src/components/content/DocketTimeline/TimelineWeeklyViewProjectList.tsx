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

type Props = {
  rowItemHeight: number;
};

const TimelineWeeklyViewProjectList = ({rowItemHeight}: Props) => {
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

  return (
    <>
      <RootTimelineWeeklyViewProjectList
        idFlatlist={1}
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
    </>
  );
};

export default TimelineWeeklyViewProjectList;

const styles = StyleSheet.create({});
