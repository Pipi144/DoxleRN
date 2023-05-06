import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import Modal from 'react-native-modal';
import {
  RootAddTimelineModal,
  StyledAddTimelineMenuControlButton,
  StyledAddTimelineMenuControlButtonContainer,
  StyledAddTimelineModalBody,
  StyledAddTimelineModalDataText,
  StyledAddTimelineModalFieldContainer,
  StyledAddTimelineModalFieldLabel,
  StyledAddTimelineModalTextInput,
  StyledCloseMenuButton,
  StyledControlButtonText,
  StyledPressableMask,
  StyledTopTitleAddTimelineModal,
  StyledTopTitleText,
} from './StyledComponentDocketTimeline';
import {AddTimelineIcon, EditTimelineMenuCloseIcon} from './DocketTimelineIcon';
import {
  FadeInDown,
  FadeInRight,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {formattedDate} from './DocketTimelineCommonFunctions';
import {formatDate} from '../../../Utilities/FunctionUtilities';
import DatePicker from 'react-native-date-picker';
import {
  ICompanyProviderContextValue,
  useCompany,
} from '../../../Providers/CompanyProvider';
type Props = {};
interface INewTimelineData {
  subject: string;
  startDate: Date;
  endDate: Date;
}

const initialNewTimeline: INewTimelineData = {
  subject: '',
  startDate: new Date(),
  endDate: new Date(),
};
const AddTimelineModal = (props: Props) => {
  //############### STATES ##############
  const [newTimeline, setnewTimeline] = useState<INewTimelineData | undefined>(
    undefined,
  );

  //#####################################
  //******************* TIMELINE PROVIDER ************ */
  const {
    newTimelineData,
    setnewTimelineData,
    addTimelineQueryFunction,
    currentBaseStartDateParams,
    currentDateRangeLengthParam,
  } = useDocketTimelineContext() as IDocketTimelineContext;
  //***********END OF TIMELINE PROVIDER************** */

  //************ COMPANY PROVIDER ************* */
  const {company} = useCompany() as ICompanyProviderContextValue;

  //************END OF COMPANY PROVIDER ******** */

  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //************END OF AUTH PROVIDER******************** */

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //***********END OF  THEME PROVIDER ********** */

  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //*********END OF ORIENTATION PROVIDER **************** */
  useEffect(() => {
    if (newTimelineData) {
      setnewTimeline({
        subject: '',
        startDate: newTimelineData.dateValue,
        endDate: newTimelineData.dateValue,
      });
    } else setnewTimeline(undefined);
  }, [newTimelineData]);
  const handleCloseModal = () => {
    setnewTimelineData(undefined);
  };
  const newTimelineSubjectTextInputRef = useRef<TextInput>(null);
  const handleNewSubjectChange = (newTitle: string) => {
    if (newTimeline) setnewTimeline({...newTimeline, subject: newTitle});
  };

  const handlePickDate = (dateValue: Date, dateType: 'start' | 'end') => {
    if (newTimeline)
      if (dateType === 'start')
        setnewTimeline({...newTimeline, startDate: dateValue});
      else setnewTimeline({...newTimeline, endDate: dateValue});
  };

  const handlePressAddBtn = () => {
    if (newTimeline) {
      handleCloseModal();
      addTimelineQueryFunction({
        accessToken: accessToken || '',
        company: company,
        newTimeline: {
          project: newTimelineData?.project.projectId || '',
          startDate: formatDate(newTimeline.startDate, 'yyyy-MM-dd'),
          endDate: formatDate(newTimeline.endDate, 'yyyy-MM-dd'),
          subject: newTimeline.subject,
          actionId: '',
          company: company?.companyId || '',
          actionIdStr: '',
          status: '9ff2713b-1425-443c-918f-6afe69747774',
        },
        currentBaseStartDateParams: currentBaseStartDateParams,
        currentDateRangeLengthParam: currentDateRangeLengthParam,
      });
    }
  };
  //$$$$$$$$$$ HANDLE ANIMATION $$$$$$$$
  //save btn animattion
  const addBtnAnimatedValue = useSharedValue(0);
  const saveBtnAnimatedStyle = useAnimatedStyle(() => {
    const bgColorInterpolate = interpolateColor(
      addBtnAnimatedValue.value,
      [0, 1],
      ['rgb(168, 170, 173)', 'rgb(123, 123, 254)'],
      'RGB',
    );
    return {
      backgroundColor: bgColorInterpolate,
    };
  });
  useEffect(() => {
    if (newTimeline && newTimeline.subject) {
      ('worklet');
      addBtnAnimatedValue.value = withSpring(1);
    } else {
      ('worklet');
      addBtnAnimatedValue.value = withSpring(0);
    }
  }, [newTimeline]);
  //------------------

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <Modal
      isVisible={Boolean(newTimelineData !== undefined)}
      hasBackdrop={true}
      backdropColor={THEME_COLOR.primaryBackdropColor}
      onBackdropPress={handleCloseModal}
      animationIn="bounceInUp"
      animationOut="fadeOutDown"
      animationInTiming={200}
      animationOutTiming={200}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <RootAddTimelineModal
        themeColor={THEME_COLOR}
        paddingBottom={deviceSize.insetBottom}
        style={
          Platform.OS === 'android' && {
            elevation: 10,
            shadowColor: THEME_COLOR.primaryReverseBackdropColor,
          }
        }>
        <StyledTopTitleAddTimelineModal themeColor={THEME_COLOR}>
          <StyledTopTitleText themeColor={THEME_COLOR}>
            Add Timeline
          </StyledTopTitleText>
          <StyledCloseMenuButton onPress={handleCloseModal}>
            <EditTimelineMenuCloseIcon themeColor={THEME_COLOR} />
          </StyledCloseMenuButton>
        </StyledTopTitleAddTimelineModal>
        {newTimeline && newTimelineData && (
          <>
            <StyledAddTimelineModalBody
              entering={FadeInDown.delay(250).duration(300)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StyledAddTimelineModalFieldContainer>
                <StyledAddTimelineModalFieldLabel>
                  Project:
                </StyledAddTimelineModalFieldLabel>

                <StyledAddTimelineModalDataText>
                  {newTimelineData.project.siteAddress}
                </StyledAddTimelineModalDataText>
              </StyledAddTimelineModalFieldContainer>
              <StyledAddTimelineModalFieldContainer>
                <StyledAddTimelineModalFieldLabel>
                  Subject
                </StyledAddTimelineModalFieldLabel>
                <StyledAddTimelineModalTextInput
                  multiline={true}
                  blurOnSubmit={true}
                  onSubmitEditing={event => Keyboard.dismiss()}
                  onChangeText={text => handleNewSubjectChange(text)}
                  value={newTimeline.subject}
                  ref={newTimelineSubjectTextInputRef}
                />
              </StyledAddTimelineModalFieldContainer>

              <StyledAddTimelineModalFieldContainer>
                <StyledAddTimelineModalFieldLabel>
                  Start Date
                </StyledAddTimelineModalFieldLabel>

                <DatePicker
                  date={newTimeline.startDate}
                  onDateChange={value => handlePickDate(value, 'start')}
                  style={{
                    height: 144,
                  }}
                  mode="date"
                  minimumDate={new Date('2020-01-01')}
                  maximumDate={new Date('2025-06-01')}
                  textColor="black"
                />
              </StyledAddTimelineModalFieldContainer>

              <StyledAddTimelineModalFieldContainer>
                <StyledAddTimelineModalFieldLabel>
                  End Date
                </StyledAddTimelineModalFieldLabel>

                <DatePicker
                  date={newTimeline.endDate}
                  onDateChange={value => handlePickDate(value, 'end')}
                  style={{
                    height: 144,
                  }}
                  mode="date"
                  minimumDate={new Date('2020-01-01')}
                  maximumDate={new Date('2025-06-01')}
                  textColor="black"
                />
              </StyledAddTimelineModalFieldContainer>
            </StyledAddTimelineModalBody>

            <StyledAddTimelineMenuControlButtonContainer>
              <StyledAddTimelineMenuControlButton
                style={saveBtnAnimatedStyle}
                entering={FadeInRight.delay(550).duration(200)}>
                <StyledPressableMask
                  disabled={!newTimeline.subject}
                  onPress={handlePressAddBtn}>
                  <AddTimelineIcon />
                  <StyledControlButtonText textColor="white">
                    Add
                  </StyledControlButtonText>
                </StyledPressableMask>
              </StyledAddTimelineMenuControlButton>
            </StyledAddTimelineMenuControlButtonContainer>
          </>
        )}
      </RootAddTimelineModal>
    </Modal>
  );
};

export default AddTimelineModal;

const styles = StyleSheet.create({});
