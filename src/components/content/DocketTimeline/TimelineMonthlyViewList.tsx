import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {RootTimelineMonthlyViewList} from './StyledComponentDocketTimeline';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {ISimpleProjectTimeline} from '../../../Models/project';
import TimelineMonthlyViewListItem from './TimelineMonthlyViewListItem';
import {
  ITimelineDateObject,
  formattedDate,
} from './DocketTimelineCommonFunctions';
import {TimelineDocket} from '../../../Models/DocketTimelineModel';

type Props = {};

const TimelineMonthlyViewList = (props: Props) => {
  //******************* TIMELINE PROVIDER ************ */
  const {projects} = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */

  return (
    <RootTimelineMonthlyViewList
      data={projects}
      showsVerticalScrollIndicator={false}
      initialNumToRender={1}
      removeClippedSubviews={true}
      maxToRenderPerBatch={2}
      renderItem={({item, index}) => (
        <TimelineMonthlyViewListItem project={item as ISimpleProjectTimeline} />
      )}
      keyExtractor={(item, index) => (item as ISimpleProjectTimeline).projectId}
      windowSize={3}
    />
  );
};

export default TimelineMonthlyViewList;

const styles = StyleSheet.create({});
