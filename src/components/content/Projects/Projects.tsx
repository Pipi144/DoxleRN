import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {RootProjects, StyledProjectContent} from './StyledComponentsProject';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import ProjectTopSection from './ProjectTopSection';
import DocketList from '../DocketList/DocketList';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: any;
};

const Projects = ({navigation}: Props) => {
  //################## STATES #################
  const [isFocused, setIsFocused] = useState<boolean>(false); //!used to optimised react navigation due to long switching screen time
  //###########################################
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, []),
  );
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */

  if (isFocused)
    return (
      <RootProjects themeColor={THEME_COLOR}>
        <ProjectTopSection />

        <StyledProjectContent>
          <DocketList />
        </StyledProjectContent>
      </RootProjects>
    );
  else return <></>;
};

export default React.memo(Projects);

const styles = StyleSheet.create({});
