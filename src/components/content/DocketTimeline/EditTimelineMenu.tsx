import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootEditTimelineMenu,
  StyledCloseMenuButton,
  StyledControlButtonText,
  StyledEditTimelineMenuBody,
  StyledEditTimelineMenuControlButton,
  StyledEditTimelineMenuControlButtonContainer,
  StyledEditTimelineMenuFieldContainer,
  StyledEditTimelineMenuFieldLabel,
  StyledEditTimelineModalTextInput,
  StyledPressableMask,
  StyledTopTitleEditTimelineMenu,
  StyledTopTitleText,
} from './StyledComponentDocketTimeline';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {
  EditTimelineMenuCloseIcon,
  EditTimelineMenuDeleteIcon,
  EditTimelineMenuSaveIcon,
} from './DocketTimelineIcon';
import {TimelineDocket} from '../../../Models/DocketTimelineModel';
import {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {checkTimelineChanges} from './DocketTimelineCommonFunctions';
import {
  ITimelineDocketDeleteQueryProps,
  ITimelineDocketUpdateQueryProps,
} from '../../../service/DoxleAPI/QueryHookAPI/timelineQueryAPI';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
type Props = {
  mutateTimelineDataQueryFunction: (
    data: ITimelineDocketUpdateQueryProps,
  ) => void;
  deleteTimelineDataQueryFunction: (
    data: ITimelineDocketDeleteQueryProps,
  ) => void;
};

const EditTimelineMenu = ({
  mutateTimelineDataQueryFunction,
  deleteTimelineDataQueryFunction,
}: Props) => {
  //******************* TIMELINE PROVIDER ************ */
  const {
    currentEdittedTimeline,
    setcurrentEdittedTimeline,
    currentBaseStartDateParams,
    currentDateRangeLengthParam,
    company,
  } = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //########################### STATES ############################
  const [initialEdittedScheduleItem, setinitialEdittedScheduleItem] = useState<
    TimelineDocket | undefined
  >(undefined);

  //###############################################################
  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********************************************** */
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //************************************************** */
  //###### get bottom inset including the swipe botttom #####

  const bottomInsetHeight = useSafeAreaInsets().bottom;
  //#############################################
  useEffect(() => {
    if (currentEdittedTimeline)
      setinitialEdittedScheduleItem({...currentEdittedTimeline});
  }, [currentEdittedTimeline]);
  const handleCloseModal = () => {
    setinitialEdittedScheduleItem(undefined);
    setcurrentEdittedTimeline(undefined);
  };

  const handleNewSubjectChange = (newTitle: string) => {
    if (initialEdittedScheduleItem)
      setinitialEdittedScheduleItem({
        ...initialEdittedScheduleItem,
        subject: newTitle,
      });
  };
  const handlePickDate = (dateValue: Date, dateType: 'start' | 'end') => {
    if (initialEdittedScheduleItem)
      if (dateType === 'start')
        setinitialEdittedScheduleItem({
          ...initialEdittedScheduleItem,
          startDate: dateValue.toISOString().substring(0, 10),
        });
      else
        setinitialEdittedScheduleItem({
          ...initialEdittedScheduleItem,
          endDate: dateValue.toISOString().substring(0, 10),
        });
  };

  const handlePressSaveBtn = () => {
    handleCloseModal();
    if (
      checkTimelineChanges({
        originalTimeline: currentEdittedTimeline,
        checkedTimeline: initialEdittedScheduleItem,
      }) !== undefined
    ) {
      mutateTimelineDataQueryFunction({
        actionId: initialEdittedScheduleItem?.actionId || '',
        accessToken: accessToken || '',
        updateBody: checkTimelineChanges({
          originalTimeline: currentEdittedTimeline,
          checkedTimeline: initialEdittedScheduleItem,
        })!,
        currentBaseStartDateParams,
        currentDateRangeLengthParam,
      });
    }
  };

  const handlePressDeleteBtn = () => {
    handleCloseModal();
    deleteTimelineDataQueryFunction({
      actionId: initialEdittedScheduleItem?.actionId || '',
      accessToken: accessToken || '',
      company: company,
    });
  };
  //$$$$$$$$$$ HANDLE ANIMATION $$$$$$$$
  //save btn animattion
  const saveBtnAnimatedValue = useSharedValue(0);
  const saveBtnAnimatedStyle = useAnimatedStyle(() => {
    const bgColorInterpolate = interpolateColor(
      saveBtnAnimatedValue.value,
      [0, 1],
      ['rgb(168, 170, 173)', 'rgb(123, 123, 254)'],
      'RGB',
    );
    return {
      backgroundColor: bgColorInterpolate,
    };
  });
  useEffect(() => {
    if (
      checkTimelineChanges({
        originalTimeline: currentEdittedTimeline,
        checkedTimeline: initialEdittedScheduleItem,
      })
    ) {
      ('worklet');
      saveBtnAnimatedValue.value = withSpring(1);
    } else {
      ('worklet');
      saveBtnAnimatedValue.value = withSpring(0);
    }
  }, [initialEdittedScheduleItem]);
  //------------------

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <Modal
      isVisible={Boolean(currentEdittedTimeline !== undefined)}
      hasBackdrop={true}
      backdropColor={THEME_COLOR.primaryBackdropColor}
      onBackdropPress={handleCloseModal}
      animationIn="bounceInUp"
      animationOut="fadeOutDown"
      animationInTiming={200}
      animationOutTiming={200}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <RootEditTimelineMenu
        themeColor={THEME_COLOR}
        paddingBottom={bottomInsetHeight}
        style={
          Platform.OS === 'android' && {
            elevation: 10,
            shadowColor: THEME_COLOR.primaryReverseBackdropColor,
          }
        }>
        <StyledTopTitleEditTimelineMenu themeColor={THEME_COLOR}>
          <StyledTopTitleText themeColor={THEME_COLOR}>
            Edit Timeline
          </StyledTopTitleText>
          <StyledCloseMenuButton onPress={handleCloseModal}>
            <EditTimelineMenuCloseIcon themeColor={THEME_COLOR} />
          </StyledCloseMenuButton>
        </StyledTopTitleEditTimelineMenu>
        {initialEdittedScheduleItem && (
          <>
            <StyledEditTimelineMenuBody
              entering={FadeInDown.delay(250).duration(300)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StyledEditTimelineMenuFieldContainer>
                <StyledEditTimelineMenuFieldLabel>
                  New Timeline Title
                </StyledEditTimelineMenuFieldLabel>

                <StyledEditTimelineModalTextInput
                  multiline={true}
                  blurOnSubmit={true}
                  onSubmitEditing={event => Keyboard.dismiss()}
                  onChangeText={text => handleNewSubjectChange(text)}
                  value={initialEdittedScheduleItem.subject}
                />
              </StyledEditTimelineMenuFieldContainer>

              <StyledEditTimelineMenuFieldContainer>
                <StyledEditTimelineMenuFieldLabel>
                  Start Date
                </StyledEditTimelineMenuFieldLabel>

                <DatePicker
                  date={new Date(initialEdittedScheduleItem.startDate)}
                  onDateChange={value => handlePickDate(value, 'start')}
                  style={{
                    height: 144,
                  }}
                  mode="date"
                  minimumDate={new Date('2020-01-01')}
                  maximumDate={new Date('2025-06-01')}
                  textColor="black"
                />
              </StyledEditTimelineMenuFieldContainer>

              <StyledEditTimelineMenuFieldContainer>
                <StyledEditTimelineMenuFieldLabel>
                  End Date
                </StyledEditTimelineMenuFieldLabel>

                <DatePicker
                  date={new Date(initialEdittedScheduleItem.endDate)}
                  onDateChange={value => handlePickDate(value, 'end')}
                  style={{
                    height: 144,
                  }}
                  mode="date"
                  minimumDate={new Date('2020-01-01')}
                  maximumDate={new Date('2025-06-01')}
                  textColor="black"
                />
              </StyledEditTimelineMenuFieldContainer>
            </StyledEditTimelineMenuBody>

            <StyledEditTimelineMenuControlButtonContainer>
              <StyledEditTimelineMenuControlButton
                bgColor="red"
                marginRight={8}
                entering={FadeInRight.delay(550).duration(200)}>
                <StyledPressableMask onPress={handlePressDeleteBtn}>
                  <EditTimelineMenuDeleteIcon />
                  <StyledControlButtonText textColor="white">
                    Delete
                  </StyledControlButtonText>
                </StyledPressableMask>
              </StyledEditTimelineMenuControlButton>

              <StyledEditTimelineMenuControlButton
                style={saveBtnAnimatedStyle}
                entering={FadeInRight.delay(750).duration(200)}>
                <StyledPressableMask
                  disabled={
                    !checkTimelineChanges({
                      originalTimeline: currentEdittedTimeline,
                      checkedTimeline: initialEdittedScheduleItem,
                    })
                  }
                  onPress={handlePressSaveBtn}>
                  <EditTimelineMenuSaveIcon />
                  <StyledControlButtonText textColor="white">
                    Save
                  </StyledControlButtonText>
                </StyledPressableMask>
              </StyledEditTimelineMenuControlButton>
            </StyledEditTimelineMenuControlButtonContainer>
          </>
        )}
      </RootEditTimelineMenu>
    </Modal>
  );
};

export default EditTimelineMenu;

const styles = StyleSheet.create({});
