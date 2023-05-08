import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootCompanyTopMenu,
  StyledCompanyDisplayerButton,
  StyledCompanyMenuTitle,
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
import {Popover} from 'native-base';

type Props = {};
const today = new Date();
const CompanyTopBanner = (props: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //*********END OF THEME PROVIDER****************** */

  //******************* ORIENTATION PROVIDER ************* */
  const {deviceSize} = useOrientation() as IOrientation;
  //*************END OF ORIENTATION PROVIDER************** */

  //************ COMPANY PROVIDER ************* */
  const {company, isLoadingCompany} =
    useCompany() as ICompanyProviderContextValue;

  //************END OF COMPANY PROVIDER ******** */
  return (
    <RootCompanyTopMenu themeColor={THEME_COLOR} topInset={deviceSize.insetTop}>
      <Popover
        trigger={triggerProps => {
          return (
            <StyledCompanyDisplayerButton
              {...triggerProps}
              themeColor={THEME_COLOR}>
              {company ? company.name : 'Anonymous'}
            </StyledCompanyDisplayerButton>
          );
        }}>
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <StyledCompanyMenuTitle themeColor={THEME_COLOR}>
            Company
          </StyledCompanyMenuTitle>
          <Popover.Body>
            This will remove all data relating to Alex. This action cannot be
            reversed. Deleted data can not be recovered.
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <StyledCompanyDisplayerButton themeColor={THEME_COLOR}>
              {company ? company.name : 'Anonymous'}
            </StyledCompanyDisplayerButton>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
      <StyledDoxleYearText themeColor={THEME_COLOR}>
        @{today.getFullYear()} Doxle
      </StyledDoxleYearText>
    </RootCompanyTopMenu>
  );
};

export default CompanyTopBanner;

const styles = StyleSheet.create({});