import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootProjects, StyledProjectContent} from './StyledComponentsProject';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import ProjectTopSection from './ProjectTopSection';
import DocketList from '../DocketList/DocketList';

type Props = {
  navigation: any;
};

const Projects = ({navigation}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */
  return (
    <RootProjects themeColor={THEME_COLOR}>
      <ProjectTopSection />

      <StyledProjectContent>
        <DocketList />
      </StyledProjectContent>
    </RootProjects>
  );
};

export default Projects;

const styles = StyleSheet.create({});
