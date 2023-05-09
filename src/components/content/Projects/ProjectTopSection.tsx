import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  StyledSearchInput,
} from './StyledComponentsProject';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import ProjectTextSkeleton from './ProjectTextSkeleton';
import {ProjectDropdownIcon} from './ProjectIcons';
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
  const [showProjectList, setShowProjectList] = useState<boolean>(false);
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
  } = useDocket() as IDocketContextValue;
  //*********END OF DOCKET PROVIDER************* */

  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //**********END OF ORIENTATION PROVIDER*********** */
  console.log('RENDER PROJECT TOP SECTION');
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

      <ProjectListBottomModal
        showProjectList={showProjectList}
        setShowProjectList={setShowProjectList}
      />
    </RootProjectTopSection>
  );
};

export default ProjectTopSection;

const styles = StyleSheet.create({});
