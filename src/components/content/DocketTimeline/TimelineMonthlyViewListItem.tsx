import {
  Alert,
  FlatList,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  RootMonthlyViewDateCellItem,
  RootTimelineMonthlyViewListItem,
  StyledCellItemDateTextPressableMask,
  StyledCellItemDateText,
  StyledEditProjectAddressControlBtn,
  StyledEditProjectAddressTextInput,
  StyledEditProjectAddressTextInputContainer,
  StyledErrorScreenContainer,
  StyledErrorText,
  StyledMonthlyViewListItemHorizontalList,
  StyledMonthlyViewProjectAddressText,
  StyledMonthlyViewWeekDayHeader,
  StyledMonthlyViewWeekDayHeaderText,
  StyledProjectAddressTextPressableWrapper,
  StyledDateAnimatedMask,
} from './StyledComponentDocketTimeline';
import {
  Extrapolation,
  FadeInLeft,
  FadeOutLeft,
  FadeOutRight,
  StretchInX,
  StretchOutX,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {ISimpleProject} from '../../../Models/project';
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
import {Icon, IconButton, Skeleton, SmallCloseIcon, VStack} from 'native-base';
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
import {XsCloseIcon} from './DocketTimelineIcon';
import ProjectQueryAPI from '../../../service/DoxleAPI/QueryHookAPI/projectQueryAPI';
import {
  ICompanyProviderContextValue,
  useCompany,
} from '../../../Providers/CompanyProvider';

const currentMonth: number = new Date().getMonth();
const DateCellListItem: React.FC<{
  project: ISimpleProject;
  dockets: TimelineDocket[];
  dateCellValue: ITimelineDateObject;
  cellSize: number;
  handleUpdateTimeline: (
    timelineItem: TimelineDocket,
    updateBody: DocketTimelineUpdateBody,
  ) => void;
}> = React.memo(
  ({project, dockets, dateCellValue, cellSize, handleUpdateTimeline}) => {
    //***************** THEME PROVIDER ************ */
    const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
    //********************************************* */
    //******************* TIMELINE PROVIDER ************ */
    const {setcurrentEdittedTimeline, setnewTimelineData} =
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

    const handleLongPressCheckbox = (docketItem: TimelineDocket) => {
      setcurrentEdittedTimeline(docketItem);
    };
    const handlePressInDateText = () => {
      'worklet';
      dateMaskAnimatedValue.value = withSpring(1);
    };
    const handlePressOutDateText = () => {
      'worklet';
      dateMaskAnimatedValue.value = withSpring(0);
    };
    const handleLongPressDateText = () => {
      setnewTimelineData({
        project: project,
        dateValue: new Date(dateCellValue.date),
      });
    };
    //$$$$$$$$$$$ HANDLE ANIMATION $$$$$$$$$$$$
    const dateMaskAnimatedValue = useSharedValue(0);
    const dateMaskAnimatedStyle = useAnimatedStyle(() => {
      const scaleXInterpolate = interpolate(
        dateMaskAnimatedValue.value,
        [0, 1],
        [0, 1],
        {
          extrapolateLeft: Extrapolation.CLAMP,
          extrapolateRight: Extrapolation.CLAMP,
        },
      );
      return {
        transform: [{scaleX: scaleXInterpolate}],
      };
    });
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    return (
      <RootMonthlyViewDateCellItem themeColor={THEME_COLOR} cellSize={cellSize}>
        <StyledCellItemDateTextPressableMask
          onPressIn={handlePressInDateText}
          onPressOut={handlePressOutDateText}
          unstable_pressDelay={50}
          onLongPress={handleLongPressDateText}
          delayLongPress={100}>
          <StyledCellItemDateText
            textColor={cellMonthValue === currentMonth ? '#5F5FDB' : '#88A4CD'}>
            {dateCellValue.dateNumber}
          </StyledCellItemDateText>

          <StyledDateAnimatedMask
            style={dateMaskAnimatedStyle}></StyledDateAnimatedMask>
        </StyledCellItemDateTextPressableMask>

        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          scrollEnabled={renderedDockets.length > 0}>
          {renderedDockets.map(docket => {
            return (
              <CustomCheckbox
                key={docket.actionId}
                isChecked={Boolean(docket.completed !== null)}
                onPress={event => handlePressCheckbox(docket)}
                text={docket.subject}
                onLongPress={event => handleLongPressCheckbox(docket)}
                delayLongPress={100}
              />
            );
          })}
        </ScrollView>
      </RootMonthlyViewDateCellItem>
    );
  },
);

type Props = {
  project: ISimpleProject;
};
const TimelineMonthlyViewListItem = ({project}: Props) => {
  //##################### STATES ################
  const [isEdittingProject, setisEdittingProject] = useState<boolean>(false);
  const [projectAddressText, setprojectAddressText] = useState<string>(
    project.siteAddress,
  );
  //#############################################
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********************************************** */

  //************ COMPANY PROVIDER ************* */
  const {company} = useCompany() as ICompanyProviderContextValue;

  //************END OF COMPANY PROVIDER ******** */

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
    mutateTimelineDataQueryFunction,

    mutateProjectTimelineQueryFunction,
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
        queueMode: 'reset',
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

  const handleUpdateTimeline = (
    timelineItem: TimelineDocket,
    updateBody: DocketTimelineUpdateBody,
  ) => {
    mutateTimelineDataQueryFunction({
      accessToken: accessToken || '',
      actionId: timelineItem.actionId,
      updateBody: updateBody,
      currentBaseStartDateParams: currentBaseStartDateParams,
      currentDateRangeLengthParam: currentDateRangeLengthParam,
    });
  };

  const handleLongPressProjectAddressText = () => {
    setisEdittingProject(true);
  };

  const handleProjectAddressTextChange = (textValue: string) => {
    setprojectAddressText(textValue);
  };
  const handleSubmitProjectAddressTextInput = () => {
    if (!projectAddressText)
      showNotification('Empty Field, Please fill up!!!', 'error');
    else if (
      projectAddressText.toLowerCase() !== project.siteAddress.toLowerCase()
    ) {
      Alert.alert('Update Confirm', 'Do you want to save?', [
        {
          text: 'Cancel',
          onPress: () => {
            setprojectAddressText(project.siteAddress);
            setisEdittingProject(false);
          },
          style: 'destructive',
        },
        {
          text: 'Save',
          onPress: () => {
            //only update if the value not change

            mutateProjectTimelineQueryFunction({
              projectId: project.projectId,
              company: company,
              accessToken: accessToken,
              updateData: {
                siteAddress: projectAddressText,
              },
            });
            setisEdittingProject(false);
          },
        },
      ]);
    } else setisEdittingProject(false);
  };
  return (
    <RootTimelineMonthlyViewListItem>
      {isEdittingProject ? (
        <StyledEditProjectAddressTextInputContainer
          entering={StretchInX.duration(300)}
          exiting={FadeOutLeft.duration(100)}
          themeColor={THEME_COLOR}>
          <StyledEditProjectAddressTextInput
            value={projectAddressText}
            autoFocus
            blurOnSubmit
            onChangeText={handleProjectAddressTextChange}
            onSubmitEditing={handleSubmitProjectAddressTextInput}
          />
        </StyledEditProjectAddressTextInputContainer>
      ) : (
        <StyledProjectAddressTextPressableWrapper
          onLongPress={handleLongPressProjectAddressText}
          delayLongPress={100}>
          <StyledMonthlyViewProjectAddressText themeColor={THEME_COLOR}>
            {project.siteAddress}
          </StyledMonthlyViewProjectAddressText>
        </StyledProjectAddressTextPressableWrapper>
      )}

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
                project={project}
              />
            )}
            ListHeaderComponent={() => (
              <View style={{flexDirection: 'row'}}>
                {displayedDays.map((weekDay, idx) => (
                  <StyledMonthlyViewWeekDayHeader
                    widthInPixel={CELL_SIZE}
                    key={`${weekDay.weekDayAbrev}#${idx}`}>
                    <StyledMonthlyViewWeekDayHeaderText>
                      {weekDay.weekDayAbrev}
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
