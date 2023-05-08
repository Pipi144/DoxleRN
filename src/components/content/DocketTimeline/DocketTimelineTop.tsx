import {StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  RootDocketTimelineTop,
  StyledSelectedPeriodMenuItemAnimatedMask,
  StyledPeriodMenuItemText,
  StyledTimelineTextContainer,
  StyledTimelineTitleText,
  StyledSearchInput,
  StyledInputSearchWrapper,
  StyledTopMenuButtonContainer,
  StyledTopMenuButton,
  StyledViewModeMenuIconButton,
  StyledTimelineViewMenuItem,
  StyledTimelineViewMenu,
  StyledTimelineViewMenuTitle,
  StyledDivider,
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
import {StretchInX, StretchOutX} from 'react-native-reanimated';

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
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {selectedPeriodView} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  return (
    <StyledTimelineViewMenuItem
      themeColor={THEME_COLOR}
      onPress={() => handlePressMenuItem(menuItem)}
      selected={Boolean(selectedPeriodView === menuItem)}>
      <StyledPeriodMenuItemText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
        {menuItem}
      </StyledPeriodMenuItemText>
      {selectedPeriodView === menuItem && (
        <StyledSelectedPeriodMenuItemAnimatedMask
          themeColor={THEME_COLOR}
          entering={StretchInX}
          exiting={StretchOutX}
        />
      )}
    </StyledTimelineViewMenuItem>
    // <StyledTimelineViewMenuItem
    //   themeColor={THEME_COLOR}
    //   onPress={() => handlePressMenuItem(menuItem)}
    //   title={menuItem}
    //   titleStyle={{
    //     fontFamily: DOXLE_FONT.primaryFont,
    //     fontStyle: 'normal',
    //     fontWeight: '500',
    //     fontSize: 14,
    //     lineHeight: 18,
    //     color: THEME_COLOR.primaryFontColor,
    //     textTransform: 'capitalize',
    //   }}
    // />
  );
};
const DocketTimelineTop = (props: Props) => {
  //$$$$$$$$$$$$$$$$$ STATES $$$$$$$$$$$$$$$$$
  const [showTimelineViewMenu, setShowTimelineViewMenu] =
    useState<boolean>(false);
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* TIMELINE PROVIDER ************ */
  const {setselectedPeriodView} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */
  const handlePressMenuItem = useCallback(
    (menuItem: TDocketTimelineTablePeriodView) => {
      setselectedPeriodView(menuItem);
      handleCloseTimelineViewMenu();
    },
    [],
  );

  const handleOpenTimelineViewMenu = () => {
    setShowTimelineViewMenu(true);
  };

  const handleCloseTimelineViewMenu = () => {
    setShowTimelineViewMenu(false);
  };
  return (
    <RootDocketTimelineTop>
      <StyledTimelineTextContainer>
        <StyledTimelineTitleText themeColor={THEME_COLOR}>
          Timeline
        </StyledTimelineTitleText>
        <DocketTimelineIcon />
      </StyledTimelineTextContainer>

      {/* <StyledPeriodMenu>
        {ACTION_TIMELINE_TABLE_PERIOD_VIEW.map((menu, idx) => (
          <PeriodMenuItem
            key={`menuItem#${idx}`}
            menuItem={menu}
            handlePressMenuItem={handlePressMenuItem}
          />
        ))}
      </StyledPeriodMenu> */}
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
        <StyledTimelineViewMenu
          visible={showTimelineViewMenu}
          onDismiss={handleCloseTimelineViewMenu}
          anchorPosition="bottom"
          themeColor={THEME_COLOR}
          contentStyle={{
            backgroundColor: THEME_COLOR.primaryContainerColor,
          }}
          anchor={
            <StyledViewModeMenuIconButton
              icon="dots-vertical"
              iconColor={THEME_COLOR.primaryFontColor}
              size={20}
              onPress={handleOpenTimelineViewMenu}
            />
          }>
          <StyledTimelineViewMenuTitle
            themeColor={THEME_COLOR}
            doxleFont={DOXLE_FONT}>
            View Menu
          </StyledTimelineViewMenuTitle>
          <StyledDivider themeColor={THEME_COLOR} />
          {ACTION_TIMELINE_TABLE_PERIOD_VIEW.map((menu, idx) => (
            <PeriodMenuItem
              key={`menuItem#${idx}`}
              menuItem={menu}
              handlePressMenuItem={handlePressMenuItem}
            />
          ))}
        </StyledTimelineViewMenu>

        {/* <Popover
          trigger={triggerProps => {
            return (
              <StyledViewModeMenuIconButton
                {...triggerProps}
                icon="dots-vertical"
                iconColor={THEME_COLOR.primaryFontColor}
                size={20}
              />
            );
          }}>
          <Popover.Content
            accessibilityLabel="Delete Customerd"
            w="56"
            style={{width: 400}}>
            <Popover.Arrow />
            <Popover.CloseButton />
            <Popover.Header>Delete Customer</Popover.Header>
            <Popover.Body>
              {ACTION_TIMELINE_TABLE_PERIOD_VIEW.map((menu, idx) => (
                <PeriodMenuItem
                  key={`menuItem#${idx}`}
                  menuItem={menu}
                  handlePressMenuItem={handlePressMenuItem}
                />
              ))}
            </Popover.Body>
            <Popover.Footer justifyContent="flex-end">
              <Button.Group space={2}>
                <Button colorScheme="coolGray" variant="ghost">
                  Cancel
                </Button>
                <Button colorScheme="danger">Delete</Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover> */}
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
      </StyledTopMenuButtonContainer>
    </RootDocketTimelineTop>
  );
};

export default DocketTimelineTop;

const styles = StyleSheet.create({});
