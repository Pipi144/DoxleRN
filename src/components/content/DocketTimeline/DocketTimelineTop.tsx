import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  RootDocketTimelineTop,
  StyledPeriodMenu,
  StyledSelectedPeriodMenuItemAnimatedMask,
  StyledPeriodMenuItemButton,
  StyledPeriodMenuItemText,
  StyledTimelineTextContainer,
  StyledTimelineTitleText,
  StyledSearchInput,
  StyledInputSearchWrapper,
  StyledTopMenuButtonContainer,
  StyledTopMenuButton,
} from './StyledComponentDocketTimeline';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {DocketTimelineIcon} from './DocketTimelineIcon';
import {
  IDocketTimelineContext,
  TDocketTimelineTablePeriodView,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {
  StretchInX,
  StretchOutX,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {};
const ACTION_TIMELINE_TABLE_PERIOD_VIEW: TDocketTimelineTablePeriodView[] = [
  'Weekly',
  'Monthly',
  'Quarterly',
  'Yearly',
];

const PeriodMenuItem: React.FC<{
  menuItem: TDocketTimelineTablePeriodView;
  handlePressMenuItem: (menuItem: TDocketTimelineTablePeriodView) => void;
}> = ({menuItem, handlePressMenuItem}) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {selectedPeriodView} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  return (
    <StyledPeriodMenuItemButton
      onPress={() => handlePressMenuItem(menuItem)}
      unstable_pressDelay={50}>
      <StyledPeriodMenuItemText themeColor={THEME_COLOR}>
        {menuItem}
      </StyledPeriodMenuItemText>
      {selectedPeriodView === menuItem && (
        <StyledSelectedPeriodMenuItemAnimatedMask
          themeColor={THEME_COLOR}
          entering={StretchInX}
          exiting={StretchOutX}
        />
      )}
    </StyledPeriodMenuItemButton>
  );
};
const DocketTimelineTop = (props: Props) => {
  //$$$$$$$$$$$$$$$$$ STATES $$$$$$$$$$$$$$$$$

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {setselectedPeriodView} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  const handlePressMenuItem = useCallback(
    (menuItem: TDocketTimelineTablePeriodView) => {
      setselectedPeriodView(menuItem);
    },
    [],
  );
  return (
    <RootDocketTimelineTop>
      <StyledTimelineTextContainer>
        <StyledTimelineTitleText themeColor={THEME_COLOR}>
          Timeline
        </StyledTimelineTitleText>
        <DocketTimelineIcon />
      </StyledTimelineTextContainer>

      <StyledPeriodMenu>
        {ACTION_TIMELINE_TABLE_PERIOD_VIEW.map((menu, idx) => (
          <PeriodMenuItem
            key={`menuItem#${idx}`}
            menuItem={menu}
            handlePressMenuItem={handlePressMenuItem}
          />
        ))}
      </StyledPeriodMenu>
      <StyledInputSearchWrapper>
        <StyledSearchInput
          placeholder="Search"
          borderWidth={0}
          _focus={{
            backgroundColor: 'transparent',
          }}
          height={'100%'}
        />
      </StyledInputSearchWrapper>

      <StyledTopMenuButtonContainer>
        <StyledTopMenuButton
          bgColor="#DCDEE6"
          _text={{
            color: '#000',
            fontSize: 11,
          }}
          _pressed={{
            opacity: 0.5,
          }}>
          Export CSV
        </StyledTopMenuButton>

        <StyledTopMenuButton
          bgColor=" #7B7BFE"
          _text={{
            color: '#fff',
            fontSize: 11,
          }}
          _pressed={{
            opacity: 0.5,
          }}>
          Calendar
        </StyledTopMenuButton>
      </StyledTopMenuButtonContainer>
    </RootDocketTimelineTop>
  );
};

export default DocketTimelineTop;

const styles = StyleSheet.create({});
