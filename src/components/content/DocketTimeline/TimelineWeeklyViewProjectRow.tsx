import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ISimpleProject} from '../../../Models/project';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootTimelineWeeklyViewProjectRow,
  StyledEditProjectAddressTextInput,
  StyledEditProjectAddressTextInputContainer,
  StyledWeeklyViewProjectAddressText,
} from './StyledComponentDocketTimeline';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {FadeOutLeft, StretchInX} from 'react-native-reanimated';
import {
  INotificationContext,
  useNotification,
} from '../../../Providers/NotificationProvider';
import Notification, {
  getContainerStyleWithTranslateY,
} from '../GeneraComponents/Notification/Notification';
import {authContextInterface, useAuth} from '../../../Providers/AuthProvider';
import {
  ICompanyProviderContextValue,
  useCompany,
} from '../../../Providers/CompanyProvider';

type Props = {
  project: ISimpleProject;
  rowItemHeight: number;
};

const TimelineWeeklyViewProjectRow = ({project, rowItemHeight}: Props) => {
  //################# STATE ################
  const [isEdittingProject, setIsEdittingProject] = useState<boolean>(false);
  const [projectAddressText, setprojectAddressText] = useState<string>(
    project.siteAddress,
  );
  //########################################
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //**********END OF THEME PROVIDER*************** */

  //************ COMPANY PROVIDER ************* */
  const {company} = useCompany() as ICompanyProviderContextValue;

  //************END OF COMPANY PROVIDER ******** */

  //******************* TIMELINE PROVIDER ************ */
  const {setnewTimelineData, mutateProjectTimelineQueryFunction} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************END OF TIMELINE PROVIDER************** */

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
  //*******END OF NOTIFICATION PROVIDER *********** */

  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********END OF  AUTH PROVIDER********** */
  const handleLongPressProjectRow = () => {
    setnewTimelineData({
      project: project,
      dateValue: new Date(),
    });
  };
  const handlePressProjectRow = () => {
    setIsEdittingProject(true);
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
            setIsEdittingProject(false);
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
            setIsEdittingProject(false);
          },
        },
      ]);
    } else setIsEdittingProject(false);
  };
  return (
    <RootTimelineWeeklyViewProjectRow
      onLongPress={handleLongPressProjectRow}
      onPress={handlePressProjectRow}
      unstable_pressDelay={50}
      delayLongPress={100}
      themeColor={THEME_COLOR}
      rowHeight={`${rowItemHeight}px`}>
      {isEdittingProject ? (
        <StyledEditProjectAddressTextInputContainer
          entering={StretchInX.duration(300)}
          exiting={FadeOutLeft.duration(100)}
          themeColor={THEME_COLOR}>
          <StyledEditProjectAddressTextInput
            style={{backgroundColor: 'transparent'}}
            value={projectAddressText}
            autoFocus
            blurOnSubmit
            onChangeText={handleProjectAddressTextChange}
            onSubmitEditing={handleSubmitProjectAddressTextInput}
          />
        </StyledEditProjectAddressTextInputContainer>
      ) : (
        <StyledWeeklyViewProjectAddressText
          themeColor={THEME_COLOR}
          numberOfLines={1}
          ellipsizeMode="tail">
          {project.siteAddress}
        </StyledWeeklyViewProjectAddressText>
      )}
    </RootTimelineWeeklyViewProjectRow>
  );
};

export default React.memo(TimelineWeeklyViewProjectRow);

const styles = StyleSheet.create({});
