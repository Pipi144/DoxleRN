import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
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
    projects,
    isLoadingProject,
    isSuccessFetchingProject,
    isErrorFetchingProject,
    selectedPeriodView,
  } = useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */

  //###### get top inset including the notch #####

  const topInsetHeight = useSafeAreaInsets().top;
  //#############################################

  useEffect(() => {
    setCompany(company);
  }, []);

  return (
    <RootDocketTimeline themeColor={THEME_COLOR}>
      <StyledTopBanner themeColor={THEME_COLOR} topInset={topInsetHeight}>
        <StyledVersionDoxleText themeColor={THEME_COLOR}>
          @{today.getFullYear()} Doxle
        </StyledVersionDoxleText>

        <StyledDownloadDoxleButton>Download Doxle</StyledDownloadDoxleButton>
      </StyledTopBanner>

      <StyledDocketTimelineMainContainer>
        <DocketTimelineTop />
        {isSuccessFetchingProject && selectedPeriodView === 'Monthly' ? (
          <TimelineMonthlyViewList />
        ) : null}
        {isErrorFetchingProject && (
          <StyledErrorScreenContainer>
            <StyledErrorText themeColor={THEME_COLOR}>
              Something wrong, Please try again...
            </StyledErrorText>
          </StyledErrorScreenContainer>
        )}
      </StyledDocketTimelineMainContainer>

      {isLoadingProject && (
        <StyledLoadingMaskContainer entering={StretchInY} exiting={FadeOut}>
          <LoadingDoxleIconWithText message="Loading Data..." />
        </StyledLoadingMaskContainer>
      )}
    </RootDocketTimeline>
  );
};

export default DocketTimeline;

const styles = StyleSheet.create({});
