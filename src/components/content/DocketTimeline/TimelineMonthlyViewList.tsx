import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {RootTimelineMonthlyViewList} from './StyledComponentDocketTimeline';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {ISimpleProject} from '../../../Models/project';
import TimelineMonthlyViewListItem from './TimelineMonthlyViewListItem';
import {FlashList} from '@shopify/flash-list';

type Props = {};

const TimelineMonthlyViewList = (props: Props) => {
  //******************* TIMELINE PROVIDER ************ */
  const {projects} = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */

  return (
    <RootTimelineMonthlyViewList>
      <FlashList
        data={projects}
        showsVerticalScrollIndicator={false}
        // removeClippedSubviews={true}
        renderItem={({item, index}) => (
          <TimelineMonthlyViewListItem
            project={item as ISimpleProject}
            key={index}
          />
        )}
        keyExtractor={(item, index) =>
          `${(item as ISimpleProject).projectId}#${index}`
        }
        estimatedItemSize={204}
        getItemType={(item, index) => typeof item}
        extraData={projects}
      />
    </RootTimelineMonthlyViewList>
  );
};

export default TimelineMonthlyViewList;

const styles = StyleSheet.create({});
