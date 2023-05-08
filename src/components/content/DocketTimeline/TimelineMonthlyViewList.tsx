import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {RootTimelineMonthlyViewList} from './StyledComponentDocketTimeline';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {ISimpleProject} from '../../../Models/project';
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
      maxToRenderPerBatch={10}
      removeClippedSubviews={true}
      renderItem={({item, index}) => (
        <TimelineMonthlyViewListItem project={item as ISimpleProject} />
      )}
      keyExtractor={(item, index) =>
        `${(item as ISimpleProject).projectId}#${index}`
      }
      extraData={projects}
      windowSize={10}
    />
  );
};

export default TimelineMonthlyViewList;

const styles = StyleSheet.create({});
