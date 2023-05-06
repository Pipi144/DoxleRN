import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootCompanyTopMenu,
  StyledCompanyDisplayerButton,
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
import {
  ICompanyProviderContextValue,
  useCompany,
} from '../../../Providers/CompanyProvider';

type Props = {};
const today = new Date();
const CompanyTopMenu = (props: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */

  //******************* ORIENTATION PROVIDER ************* */
  const {deviceSize} = useOrientation() as IOrientation;
  //*************END OF ORIENTATION PROVIDER************** */

  //************ COMPANY PROVIDER ************* */
  const {company, isLoadingCompany} =
    useCompany() as ICompanyProviderContextValue;
  console.log('GET COMPANY:', company);
  //************END OF COMPANY PROVIDER ******** */
  return (
    <RootCompanyTopMenu themeColor={THEME_COLOR} topInset={deviceSize.insetTop}>
      <StyledCompanyDisplayerButton themeColor={THEME_COLOR}>
        {company?.name}
      </StyledCompanyDisplayerButton>
      <StyledDoxleYearText themeColor={THEME_COLOR}>
        @{today.getFullYear()} Doxle
      </StyledDoxleYearText>
    </RootCompanyTopMenu>
  );
};

export default CompanyTopMenu;

const styles = StyleSheet.create({});
