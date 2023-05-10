import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootProjectTopSection,
  StyledInboxSubTitleText,
  StyledInputSearchWrapper,
  StyledProjectAddressContainer,
  StyledProjectAddressText,
  StyledProjectDropdownIconContainer,
  StyledProjectMenuContainer,
  StyledProjectMenuIconBtn,
  StyledProjectMenuItem,
  StyledProjectMenuItemText,
  StyledProjectMenuList,
  StyledSearchInput,
} from './StyledComponentsProject';
import {
  IDocketContextValue,
  IProjectMenuProps,
  PROJECT_MENU_LIST,
  useDocket,
} from '../../../Providers/DocketProvider';
import ProjectTextSkeleton from './ProjectTextSkeleton';
import {
  ProjectDropdownIcon,
  ProjectMenuMoreIcon,
  ProjectMenuSearchIcon,
} from './ProjectIcons';
import {
  concat,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ProjectListBottomModal from './ProjectListBottomModal';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';

type Props = {};

const ProjectTopSection = (props: Props) => {
  //######################### STATES #########################
  const [showProjectList, setShowProjectList] = useState<boolean>(false);
  const [onSearchMode, setOnSearchMode] = useState<boolean>(false);
  //##################### END OF STATES ######################

  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  //***************** DOCKET PROVIDER ************ */
  const {
    docketQuote,
    isLoadingProject,
    isSuccessFetchingProject,
    selectedProject,
    selectedProjectMenu,
    setselectedProjectMenu,
  } = useDocket() as IDocketContextValue;
  //*********END OF DOCKET PROVIDER************* */

  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;

  const projectMenuContainerMaxWidth: number = useMemo(
    () =>
      deviceSize.deviceWidth < 1000
        ? 0.8 * deviceSize.deviceWidth
        : 0.6 * deviceSize.deviceWidth,
    [deviceSize],
  );
  //**********END OF ORIENTATION PROVIDER*********** */

  const handlePressProjectMenuItem = (item: IProjectMenuProps) => {
    setselectedProjectMenu(item);
  };

  useEffect(() => {
    console.log('SELECTED MENU:', selectedProjectMenu);
  }, [selectedProjectMenu]);

  //####################### HANDLE ANIMATION #################
  const dropdownIconContainerSharedValue = useSharedValue(0);
  const dropdownIconContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${dropdownIconContainerSharedValue.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    if (showProjectList)
      dropdownIconContainerSharedValue.value = withTiming(180, {duration: 200});
    else
      dropdownIconContainerSharedValue.value = withTiming(0, {duration: 200});
  }, [showProjectList]);

  //################ END OF HANDLE ANIMATION #################
  return (
    <RootProjectTopSection>
      {isLoadingProject && <ProjectTextSkeleton />}
      {isSuccessFetchingProject && selectedProject && (
        <StyledProjectAddressContainer
          onPress={() => setShowProjectList(!showProjectList)}>
          <StyledProjectAddressText
            themeColor={THEME_COLOR}
            doxleFont={DOXLE_FONT}
            style={{maxWidth: deviceSize.deviceWidth * 0.7}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {selectedProject.siteAddress}
          </StyledProjectAddressText>

          <StyledProjectDropdownIconContainer
            style={[dropdownIconContainerAnimatedStyle]}>
            <ProjectDropdownIcon themeColor={THEME_COLOR} />
          </StyledProjectDropdownIconContainer>
        </StyledProjectAddressContainer>
      )}
      <StyledInboxSubTitleText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
        {docketQuote}
      </StyledInboxSubTitleText>

      <StyledProjectMenuContainer
        widthInPixel={`${projectMenuContainerMaxWidth}px`}>
        {!onSearchMode ? (
          <>
            <StyledProjectMenuList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={PROJECT_MENU_LIST}
              renderItem={({item, index}) => {
                if ((item as IProjectMenuProps).display)
                  return (
                    <StyledProjectMenuItem
                      onPress={() =>
                        handlePressProjectMenuItem(item as IProjectMenuProps)
                      }>
                      <StyledProjectMenuItemText
                        themeColor={THEME_COLOR}
                        selected={Boolean(
                          selectedProjectMenu.menuName ===
                            (item as IProjectMenuProps).menuName,
                        )}
                        doxleFont={DOXLE_FONT}>
                        {(item as IProjectMenuProps).menuName}
                      </StyledProjectMenuItemText>
                    </StyledProjectMenuItem>
                  );
                else return <></>;
              }}
              keyExtractor={(item, index) =>
                `item#${(item as IProjectMenuProps).menuName}#${index}`
              }
            />
            <StyledProjectMenuIconBtn
              icon={() => <ProjectMenuSearchIcon themeColor={THEME_COLOR} />}
              size={10}
            />

            <StyledProjectMenuIconBtn
              icon={() => <ProjectMenuMoreIcon themeColor={THEME_COLOR} />}
              size={10}
            />
          </>
        ) : (
          <StyledInputSearchWrapper>
            <StyledSearchInput
              placeholder="Search"
              borderWidth={0}
              _focus={{
                backgroundColor: 'transparent',
              }}
              height={'100%'}
              themeColor={THEME_COLOR}
              doxleFont={DOXLE_FONT}
            />
          </StyledInputSearchWrapper>
        )}
      </StyledProjectMenuContainer>

      <ProjectListBottomModal
        showProjectList={showProjectList}
        setShowProjectList={setShowProjectList}
      />
    </RootProjectTopSection>
  );
};

export default ProjectTopSection;

const styles = StyleSheet.create({});
