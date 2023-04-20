import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {ISimpleProjectTimeline} from '../../../Models/project';
import {
  RootTimelineWeeklyViewDataRow,
  StyledTimelineWeeklyViewDataCell,
} from './StyledComponentDocketTimeline';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IDocketTimelineContext,
  displayedDays,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {isRendered} from './DocketTimelineCommonFunctions';
import {TimelineDocket} from '../../../Models/DocketTimelineModel';
import CustomCheckbox from '../GeneraComponents/Checkbox/CustomCheckbox';
import {formatDate} from '../../../Utilities/FunctionUtilities';
import {DocketTimelineUpdateBody} from '../../../service/DoxleAPI/QueryHookAPI/timelineQueryAPI';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';

type Props = {
  project: ISimpleProjectTimeline;
  rowItemHeight: number;
  maxWidthProjectColumn: number;
  matchedDockets: TimelineDocket[];
};

const TimelineWeeklyViewDataRow = ({
  project,
  rowItemHeight,
  maxWidthProjectColumn,
  matchedDockets,
}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {
    currentWeekDays,
    filterDocketWithDate,
    setcurrentEdittedTimeline,
    mutateTimelineDataQueryFunction,
    currentBaseStartDateParams,
    currentDateRangeLengthParam,
  } = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********************************************** */
  const handlePressCheckbox = (docketItem: TimelineDocket) => {
    mutateTimelineDataQueryFunction({
      accessToken: accessToken || '',
      actionId: docketItem.actionId,
      updateBody: {
        completed:
          docketItem.completed !== null
            ? null
            : formatDate(docketItem.startDate, 'yyyy-MM-dd'),
      },
      currentBaseStartDateParams: currentBaseStartDateParams,
      currentDateRangeLengthParam: currentDateRangeLengthParam,
    });
  };

  const handleLongPressCheckbox = (docketItem: TimelineDocket) => {
    setcurrentEdittedTimeline(docketItem);
  };
  return (
    <RootTimelineWeeklyViewDataRow
      rowHeight={`${rowItemHeight}px`}
      themeColor={THEME_COLOR}>
      <StyledTimelineWeeklyViewDataCell
        width={`${maxWidthProjectColumn}px`}
        themeColor={THEME_COLOR}></StyledTimelineWeeklyViewDataCell>
      {currentWeekDays.map((weekDay, idx) => {
        const renderedDockets: TimelineDocket[] = filterDocketWithDate(
          weekDay.fullDay,
          matchedDockets,
        );
        return (
          <StyledTimelineWeeklyViewDataCell
            key={`project#${project.projectId}#${idx}`}
            width={`${maxWidthProjectColumn}px`}
            themeColor={THEME_COLOR}>
            {renderedDockets.length > 0 ? (
              <FlatList
                data={renderedDockets}
                numColumns={2}
                style={{width: '100%', height: '100%'}}
                renderItem={({item, index}) => (
                  <CustomCheckbox
                    style={{width: '49% !important'}}
                    textContainerStyle={{width: '49%', backgroundColor: 'red'}}
                    key={item.actionId}
                    isChecked={Boolean(item.completed !== null)}
                    onPress={event => handlePressCheckbox(item)}
                    text={item.subject}
                    onLongPress={event => handleLongPressCheckbox(item)}
                    delayLongPress={100}
                  />
                )}
              />
            ) : null}
          </StyledTimelineWeeklyViewDataCell>
        );
      })}
    </RootTimelineWeeklyViewDataRow>
  );
};

export default React.memo(TimelineWeeklyViewDataRow);

const styles = StyleSheet.create({});
