import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  RootMonthlyViewDateCellItem,
  RootTimelineMonthlyViewListItem,
  StyledCellItemDateText,
  StyledErrorScreenContainer,
  StyledErrorText,
  StyledMonthlyViewListItemHorizontalList,
  StyledMonthlyViewProjectAddressText,
  StyledMonthlyViewWeekDayHeader,
  StyledMonthlyViewWeekDayHeaderText,
} from './StyledComponentDocketTimeline';
import {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {ISimpleProjectTimeline} from '../../../Models/project';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IDocketTimelineContext,
  displayedDays,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {TimelineDocket} from '../../../Models/DocketTimelineModel';
import {ITimelineDateObject, isRendered} from './DocketTimelineCommonFunctions';
import {Skeleton, VStack} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import CustomCheckbox from '../GeneraComponents/Checkbox/CustomCheckbox';
import {
  INotificationContext,
  useNotification,
} from '../../../Providers/NotificationProvider';
import Notification, {
  getContainerStyleWithTranslateY,
} from '../GeneraComponents/Notification/Notification';
import TimelineQueryAPI, {
  DocketTimelineUpdateBody,
} from '../../../service/DoxleAPI/QueryHookAPI/timelineQueryAPI';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
import {formatDate} from '../../../Utilities/FunctionUtilities';

const currentMonth: number = new Date().getMonth();
const DateCellListItem: React.FC<{
  dockets: TimelineDocket[];
  dateCellValue: ITimelineDateObject;
  cellSize: number;
  handleUpdateTimeline: (
    timelineItem: TimelineDocket,
    updateBody: DocketTimelineUpdateBody,
  ) => void;
}> = ({dockets, dateCellValue, cellSize, handleUpdateTimeline}) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {setcurrentEdittedTimeline} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  const cellMonthValue: number = new Date(dateCellValue.date).getMonth();
  const renderedDockets = useMemo(
    () => dockets.filter(docket => isRendered(docket, dateCellValue)),
    [dockets],
  );

  const handlePressCheckbox = (docketItem: TimelineDocket) => {
    handleUpdateTimeline(docketItem, {
      completed:
        docketItem.completed !== null
          ? null
          : formatDate(docketItem.startDate, 'yyyy-MM-dd'),
    });
  };

  const handleLongPressCheckbox = (
    event: GestureResponderEvent,
    docketItem: TimelineDocket,
  ) => {
    event.preventDefault();
    console.log('LONG PRESS');
    setcurrentEdittedTimeline(docketItem);
  };
  return (
    <RootMonthlyViewDateCellItem themeColor={THEME_COLOR} cellSize={cellSize}>
      <StyledCellItemDateText
        textColor={cellMonthValue === currentMonth ? '#5F5FDB' : '#88A4CD'}>
        {dateCellValue.dateNumber}
      </StyledCellItemDateText>

      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={renderedDockets.length > 0}>
        {renderedDockets.map(docket => {
          return (
            <Pressable
              key={docket.actionId}
              unstable_pressDelay={50}
              onLongPress={event => handleLongPressCheckbox(event, docket)}
              delayLongPress={50}
              style={{
                width: '100%',
                height: 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <CustomCheckbox
                value={docket.actionId}
                accessibilityLabel={docket.actionId}
                onChange={value => handlePressCheckbox(docket)}
                isChecked={Boolean(docket.completed !== null)}>
                {docket.subject}
              </CustomCheckbox>
            </Pressable>
          );
        })}
      </ScrollView>
    </RootMonthlyViewDateCellItem>
  );
};

type Props = {
  project: ISimpleProjectTimeline;
};
const TimelineMonthlyViewListItem = ({project}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********************************************** */
  //******************* TIMELINE PROVIDER ************ */
  const {
    dockets,
    filterDocketWithProject,
    isLoadingDocket,
    isErrorFetchingDocket,
    isSuccessFetchingDocket,
    calendarCells,
    currentBaseStartDateParams,
    currentDateRangeLengthParam,
  } = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //************************************************** */
  //************* NOTIFICATION PROVIDER*************** */
  const {notifierRootAppRef} = useNotification() as INotificationContext;
  //handle show notification
  const showNotification = useCallback(
    (
      message: string,
      messageType: 'success' | 'error',
      extraMessage?: string,
    ) => {
      notifierRootAppRef.current?.showNotification({
        title: message,
        description: extraMessage,
        Component: Notification,
        queueMode: 'next',
        componentProps: {
          type: messageType,
        },
        containerStyle: getContainerStyleWithTranslateY,
      });
    },
    [],
  );
  //*********************************************** */
  //############### SIZE CONSTANTS FOR CELL ITEMS ###########
  const CELL_SIZE: number = useMemo(
    () => (deviceSize.deviceWidth < 700 ? 139 : 200),
    [deviceSize],
  );
  //#########################################################

  //################## HANDLING UPDATE ACTIONS #############
  const updateTimelineMutation = TimelineQueryAPI.useUpdateTimelineDocket({
    showNotification: showNotification,
  });

  //########################################################

  const handleUpdateTimeline = (
    timelineItem: TimelineDocket,
    updateBody: DocketTimelineUpdateBody,
  ) => {
    updateTimelineMutation.mutate({
      accessToken: accessToken || '',
      actionId: timelineItem.actionId,
      updateBody: updateBody,
      currentBaseStartDateParams: currentBaseStartDateParams,
      currentDateRangeLengthParam: currentDateRangeLengthParam,
    });
  };

  return (
    <RootTimelineMonthlyViewListItem
      entering={FadeInLeft.duration(200)}
      exiting={FadeOutRight.duration(200)}>
      <StyledMonthlyViewProjectAddressText themeColor={THEME_COLOR}>
        {project.siteAddress}
      </StyledMonthlyViewProjectAddressText>
      {isErrorFetchingDocket && (
        <StyledErrorScreenContainer>
          <StyledErrorText themeColor={THEME_COLOR}>
            Something wrong, Please Try again
          </StyledErrorText>
        </StyledErrorScreenContainer>
      )}
      {isSuccessFetchingDocket && (
        <StyledMonthlyViewListItemHorizontalList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <FlatList
            numColumns={5}
            data={calendarCells}
            renderItem={({item, index}) => (
              <DateCellListItem
                dateCellValue={item as ITimelineDateObject}
                dockets={filterDocketWithProject(project, dockets)}
                cellSize={CELL_SIZE}
                handleUpdateTimeline={handleUpdateTimeline}
              />
            )}
            ListHeaderComponent={() => (
              <View style={{flexDirection: 'row'}}>
                {displayedDays.map((weekDay, idx) => (
                  <StyledMonthlyViewWeekDayHeader
                    widthInPixel={CELL_SIZE}
                    key={`${weekDay.weekDayName}#${idx}`}>
                    <StyledMonthlyViewWeekDayHeaderText>
                      {weekDay.weekDayName}
                    </StyledMonthlyViewWeekDayHeaderText>
                  </StyledMonthlyViewWeekDayHeader>
                ))}
              </View>
            )}
            stickyHeaderIndices={[0]}
            keyExtractor={(item, index) =>
              `project#${project.projectId}#${index}#${
                (item as ITimelineDateObject).date
              }`
            }
            extraData={{dockets, project}}
          />
        </StyledMonthlyViewListItemHorizontalList>
      )}
      {isLoadingDocket && (
        <VStack flex="1" space="4" marginTop={10}>
          <Skeleton.Text />
          <Skeleton h="3" flex="1" rounded="full" startColor="#7B7BFE" />
        </VStack>
      )}
    </RootTimelineMonthlyViewListItem>
  );
};

export default TimelineMonthlyViewListItem;

const styles = StyleSheet.create({});
