import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootProjects} from './StyledComponentsProject';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import ProjectTopSection from './ProjectTopSection';

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
    </RootProjects>
  );
};

export default Projects;

const styles = StyleSheet.create({});
