import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  RootProjectListItem,
  StyledProjectItemAddressText,
} from './StyledComponentsProject';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {ISimpleProject} from '../../../Models/project';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';

type Props = {
  project: ISimpleProject;
  handlePressProjectListItem: (project: ISimpleProject) => void;
};

const ProjectListItem = ({project, handlePressProjectListItem}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //**************END OF THEME PROVIDER ************* */

  //***************** DOCKET PROVIDER ************ */
  const {selectedProject, setselectedProject} =
    useDocket() as IDocketContextValue;
  //*********END OF DOCKET PROVIDER************* */

  return (
    <Pressable onPress={() => handlePressProjectListItem(project)}>
      <RootProjectListItem themeColor={THEME_COLOR}>
        <StyledProjectItemAddressText
          themeColor={THEME_COLOR}
          selected={Boolean(
            selectedProject && selectedProject.projectId === project.projectId,
          )}
          doxleFont={DOXLE_FONT}
          numberOfLines={1}
          ellipsizeMode="tail">
          {project.siteAddress}
        </StyledProjectItemAddressText>
      </RootProjectListItem>
    </Pressable>
  );
};

export default ProjectListItem;

const styles = StyleSheet.create({});
