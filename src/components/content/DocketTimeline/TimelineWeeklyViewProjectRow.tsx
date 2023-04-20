import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ISimpleProjectTimeline} from '../../../Models/project';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootTimelineWeeklyViewProjectRow,
  StyledWeeklyViewProjectAddressText,
} from './StyledComponentDocketTimeline';

type Props = {
  project: ISimpleProjectTimeline;
  rowItemHeight: number;
};

const TimelineWeeklyViewProjectRow = ({project, rowItemHeight}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  return (
    <RootTimelineWeeklyViewProjectRow
      themeColor={THEME_COLOR}
      rowHeight={`${rowItemHeight}px`}>
      <StyledWeeklyViewProjectAddressText
        themeColor={THEME_COLOR}
        numberOfLines={1}
        ellipsizeMode="tail">
        {project.siteAddress}
      </StyledWeeklyViewProjectAddressText>
    </RootTimelineWeeklyViewProjectRow>
  );
};

export default TimelineWeeklyViewProjectRow;

const styles = StyleSheet.create({});
