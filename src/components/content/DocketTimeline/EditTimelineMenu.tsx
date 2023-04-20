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
  StyledEditTimelineMenuBody,
  StyledEditTimelineMenuFieldContainer,
  StyledEditTimelineMenuFieldLabel,
  StyledEditTimelineModalTextInput,
  StyledTopTitleEditTimelineMenu,
  StyledTopTitleText,
} from './StyledComponentDocketTimeline';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {EditTimelineMenuCloseIcon} from './DocketTimelineIcon';
import {TimelineDocket} from '../../../Models/DocketTimelineModel';
import {FadeInDown} from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
type Props = {};

const EditTimelineMenu = (props: Props) => {
  //******************* TIMELINE PROVIDER ************ */
  const {currentEdittedTimeline, setcurrentEdittedTimeline} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //########################### STATES ############################
  const [initialEdittedScheduleItem, setinitialEdittedScheduleItem] = useState<
    TimelineDocket | undefined
  >(undefined);

  const [onProcessing, setonProcessing] = useState<boolean>(false);
  //###############################################################
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //************************************************** */
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
  return (
    <Modal
      isVisible={Boolean(currentEdittedTimeline !== undefined)}
      hasBackdrop={true}
      backdropColor={THEME_COLOR.primaryBackdropColor}
      onBackdropPress={handleCloseModal}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={200}
      animationOutTiming={200}
      style={{position: 'relative', width: deviceSize.deviceWidth, margin: 0}}>
      <RootEditTimelineMenu
        themeColor={THEME_COLOR}
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
          <StyledCloseMenuButton>
            <EditTimelineMenuCloseIcon themeColor={THEME_COLOR} />
          </StyledCloseMenuButton>
        </StyledTopTitleEditTimelineMenu>
        {initialEdittedScheduleItem && (
          <StyledEditTimelineMenuBody
            entering={FadeInDown.delay(250).duration(300)}
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
                  flex: 1,
                }}
                mode="date"
                minimumDate={new Date('2023-01-01')}
                maximumDate={new Date('2024-06-01')}
                textColor="black"
              />
            </StyledEditTimelineMenuFieldContainer>
          </StyledEditTimelineMenuBody>
        )}
      </RootEditTimelineMenu>
    </Modal>
  );
};

export default EditTimelineMenu;

const styles = StyleSheet.create({});
