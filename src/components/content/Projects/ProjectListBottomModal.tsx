import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Modal from 'react-native-modal';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  RootProjectListBottomModal,
  StyledProjectList,
  StyledProjectListTitleContainer,
  StyledProjectListTitleText,
} from './StyledComponentsProject';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
import {
  IDocketContextValue,
  useDocket,
} from '../../../Providers/DocketProvider';
import ProjectListItem from './ProjectListItem';
import {ISimpleProject} from '../../../Models/project';
type Props = {
  showProjectList: boolean;
  setShowProjectList: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectListBottomModal = ({
  showProjectList,
  setShowProjectList,
}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //**************END OF THEME PROVIDER ************* */

  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //**********END OF ORIENTATION PROVIDER*********** */

  //***************** DOCKET PROVIDER ************ */
  const {projects, selectedProject, setselectedProject} =
    useDocket() as IDocketContextValue;
  //*********END OF DOCKET PROVIDER************* */
  const handleCloseModal = () => {
    setShowProjectList(false);
  };

  const handlePressProjectListItem = useCallback(
    (project: ISimpleProject) => {
      handleCloseModal();

      //!TEMP: have to put set timeout to trigger the state due to heavy rerender causing lag! The modal will be closed first then trigger set state
      setTimeout(() => {
        setselectedProject(project);
      }, 200);
    },
    [selectedProject],
  );
  return (
    <Modal
      isVisible={showProjectList}
      hasBackdrop={true}
      backdropColor={THEME_COLOR.primaryBackdropColor}
      onBackdropPress={handleCloseModal}
      animationIn="bounceInUp"
      animationOut="fadeOutDown"
      animationInTiming={200}
      animationOutTiming={200}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <RootProjectListBottomModal
        themeColor={THEME_COLOR}
        paddingBottom={deviceSize.insetBottom}
        style={
          Platform.OS === 'android' && {
            elevation: 10,
            shadowColor: THEME_COLOR.primaryReverseBackdropColor,
          }
        }
        heightInPixel={`${deviceSize.deviceHeight * 0.7}px`}>
        <StyledProjectListTitleContainer themeColor={THEME_COLOR}>
          <View
            style={{
              paddingHorizontal: 14,
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: THEME_COLOR.doxleColor,
            }}>
            <StyledProjectListTitleText
              themeColor={THEME_COLOR}
              doxleFont={DOXLE_FONT}>
              Project Menu
            </StyledProjectListTitleText>
          </View>
        </StyledProjectListTitleContainer>

        <StyledProjectList
          data={projects}
          renderItem={({item, index}) => (
            <ProjectListItem
              project={item as ISimpleProject}
              handlePressProjectListItem={handlePressProjectListItem}
            />
          )}
          keyExtractor={(item, index) =>
            `${(item as ISimpleProject).projectId}`
          }
          initialNumToRender={20}
          removeClippedSubviews={true}
        />
      </RootProjectListBottomModal>
    </Modal>
  );
};

export default ProjectListBottomModal;
