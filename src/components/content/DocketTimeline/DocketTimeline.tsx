import {StyleSheet} from 'react-native';
import React from 'react';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {
  RootDocketTimeline,
  StyledDocketTimelineMainContainer,
  StyledErrorScreenContainer,
  StyledErrorText,
  StyledLoadingMaskContainer,
} from './StyledComponentDocketTimeline';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import DocketTimelineTop from './DocketTimelineTop';
import LoadingDoxleIconWithText from '../../../Utilities/AnimationScreens/LoadingDoxleIconWithText/LoadingDoxleIconWithText';
import {FadeOut, StretchInY} from 'react-native-reanimated';
import TimelineMonthlyViewList from './TimelineMonthlyViewList';
import EditTimelineMenu from './EditTimelineMenu';
import ProcessingScreen from '../../../Utilities/AnimationScreens/ProcessingAnimation/ProcessingScreen';
import TimelineWeeklyView from './TimelineWeeklyView';
import AddTimelineModal from './AddTimelineModal';
type Props = {
  navigation: any;
};
const today = new Date();
const DocketTimeline = ({navigation}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {
    isLoadingProject,
    isSuccessFetchingProject,
    isErrorFetchingProject,
    selectedPeriodView,
    isUpdatingDocket,
    isDeletingDocket,
    isUpdatingProject,
    isAddingTimeline,
  } = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //************************************************** */

  return (
    <RootDocketTimeline themeColor={THEME_COLOR}>
      <StyledDocketTimelineMainContainer insetBottom={deviceSize.insetBottom}>
        <DocketTimelineTop />
        {isSuccessFetchingProject && selectedPeriodView === 'Monthly' ? (
          <TimelineMonthlyViewList />
        ) : selectedPeriodView === 'Weekly' ? (
          <TimelineWeeklyView />
        ) : (
          <StyledErrorScreenContainer>
            <StyledErrorText themeColor={THEME_COLOR}>
              {isErrorFetchingProject
                ? ' Something wrong, Please try again...'
                : ' Coming Soon...'}
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
      {isAddingTimeline ? (
        <StyledLoadingMaskContainer
          entering={StretchInY}
          exiting={FadeOut}
          opacityBackdrop="0.4">
          <ProcessingScreen
            processingType="add"
            processingText="Adding New Timeline..."
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

      <AddTimelineModal />
    </RootDocketTimeline>
  );
};

export default React.memo(DocketTimeline);

const styles = StyleSheet.create({});
