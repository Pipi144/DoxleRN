import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Company} from '../../../Models/company';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {
  RootDocketTimeline,
  StyledDocketTimelineMainContainer,
  StyledDownloadDoxleButton,
  StyledErrorScreenContainer,
  StyledErrorText,
  StyledLoadingMaskContainer,
  StyledTopBanner,
  StyledVersionDoxleText,
} from './StyledComponentDocketTimeline';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DocketTimelineTop from './DocketTimelineTop';
import LoadingDoxleIconWithText from '../../../Utilities/AnimationScreens/LoadingDoxleIconWithText/LoadingDoxleIconWithText';
import {FadeOut, StretchInY, StretchOutY} from 'react-native-reanimated';
import TimelineMonthlyViewList from './TimelineMonthlyViewList';
import EditTimelineMenu from './EditTimelineMenu';
import TimelineQueryAPI from '../../../service/DoxleAPI/QueryHookAPI/timelineQueryAPI';
import {
  INotificationContext,
  useNotification,
} from '../../../Providers/NotificationProvider';
import Notification, {
  getContainerStyleWithTranslateY,
} from '../GeneraComponents/Notification/Notification';
import ProcessingScreen from '../../../Utilities/AnimationScreens/ProcessingAnimation/ProcessingScreen';
import TimelineWeeklyView from './TimelineWeeklyView';
type Props = {
  company: Company;
};
const today = new Date();
const DocketTimeline = ({company}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {
    setCompany,
    isLoadingProject,
    isSuccessFetchingProject,
    isErrorFetchingProject,
    selectedPeriodView,
    isUpdatingDocket,
    isDeletingDocket,
    isUpdatingProject,
  } = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //************************************************** */

  useEffect(() => {
    setCompany(company);
  }, []);

  return (
    <RootDocketTimeline themeColor={THEME_COLOR}>
      <StyledTopBanner themeColor={THEME_COLOR} topInset={deviceSize.insetTop}>
        <StyledVersionDoxleText themeColor={THEME_COLOR}>
          @{today.getFullYear()} Doxle
        </StyledVersionDoxleText>

        <StyledDownloadDoxleButton>Download Doxle</StyledDownloadDoxleButton>
      </StyledTopBanner>

      <StyledDocketTimelineMainContainer insetBottom={deviceSize.insetBottom}>
        <DocketTimelineTop />
        {isSuccessFetchingProject && selectedPeriodView === 'Monthly' ? (
          <TimelineMonthlyViewList />
        ) : selectedPeriodView === 'Weekly' ? (
          <TimelineWeeklyView />
        ) : (
          <StyledErrorScreenContainer>
            <StyledErrorText themeColor={THEME_COLOR}>
              Coming Soon...
            </StyledErrorText>
          </StyledErrorScreenContainer>
        )}
        {isErrorFetchingProject && (
          <StyledErrorScreenContainer>
            <StyledErrorText themeColor={THEME_COLOR}>
              Something wrong, Please try again...
            </StyledErrorText>
          </StyledErrorScreenContainer>
        )}
      </StyledDocketTimelineMainContainer>

      {isLoadingProject && (
        <StyledLoadingMaskContainer
          entering={StretchInY}
          exiting={FadeOut}
          opacityBackdrop="0.9">
          <LoadingDoxleIconWithText message="Loading Data..." />
        </StyledLoadingMaskContainer>
      )}

      {isUpdatingDocket || isUpdatingProject ? (
        <StyledLoadingMaskContainer
          entering={StretchInY}
          exiting={FadeOut}
          opacityBackdrop="0.4">
          <ProcessingScreen
            processingType="update"
            processingText="Updating..."
          />
        </StyledLoadingMaskContainer>
      ) : null}

      {isDeletingDocket ? (
        <StyledLoadingMaskContainer
          entering={StretchInY}
          exiting={FadeOut}
          opacityBackdrop="0.2">
          <ProcessingScreen
            processingType="delete"
            processingText="Deleting..."
          />
        </StyledLoadingMaskContainer>
      ) : null}
      <EditTimelineMenu />
    </RootDocketTimeline>
  );
};

export default DocketTimeline;

const styles = StyleSheet.create({});
