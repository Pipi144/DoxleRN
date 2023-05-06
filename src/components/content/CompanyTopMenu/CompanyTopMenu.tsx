import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootCompanyTopMenu,
  StyledDoxleYearText,
} from './StyledComponentsCompanyTopMenu';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';

type Props = {};
const today = new Date();
const CompanyTopMenu = (props: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */

  //******************* ORIENTATION PROVIDER ************* */
  const {deviceSize} = useOrientation() as IOrientation;
  //*************END OF ORIENTATION PROVIDER************** */

  return (
    <RootCompanyTopMenu themeColor={THEME_COLOR} topInset={deviceSize.insetTop}>
      <StyledDoxleYearText themeColor={THEME_COLOR}>
        @{today.getFullYear()} Doxle
      </StyledDoxleYearText>
    </RootCompanyTopMenu>
  );
};

export default CompanyTopMenu;

const styles = StyleSheet.create({});
