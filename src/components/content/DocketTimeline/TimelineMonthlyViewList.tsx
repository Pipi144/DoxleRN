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
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';

type Props = {};

const TimelineMonthlyViewList = (props: Props) => {
  //******************* TIMELINE PROVIDER ************ */
  const {projects} = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */

  return (
    <RootTimelineMonthlyViewList
      data={projects}
      showsVerticalScrollIndicator={false}
      initialNumToRender={2}
      maxToRenderPerBatch={4}
      removeClippedSubviews={true}
      renderItem={({item, index}) => (
        <TimelineMonthlyViewListItem project={item as ISimpleProjectTimeline} />
      )}
      keyExtractor={(item, index) =>
        `${(item as ISimpleProjectTimeline).projectId}#${index}`
      }
      extraData={projects}
      windowSize={6}
    />
  );
};

export default TimelineMonthlyViewList;

const styles = StyleSheet.create({});
