import React, {createContext, useContext, useMemo, useState} from 'react';

type Props = {};
export type TDOXLETheme = 'dark' | 'light';
export interface IDOXLEThemeProviderContext {
  theme: TDOXLETheme;
  setDOXLETheme: (theme: TDOXLETheme) => void;
  THEME_COLOR: IDOXLEThemeColor;
  DOXLE_FONT: IDoxleFont;
}

export interface IDOXLEThemeColor {
  primaryFontColor: string;
  primaryReverseFontColor: string;
  primaryBackgroundColor: string;
  primaryContainerColor: string;
  primaryBackdropColor: string;
  primaryReverseBackdropColor: string;
  primaryDividerColor: string;
}
//$$$$$$$$$$$$$$$$$$$ FONT CONSTANT $$$$$$$$$$$$$$$$$$$$$$$$$$
interface IDoxleFont {
  primaryFont: string;
  titleFont: string;
  subTitleFont: string;
  secondaryFont: string;
}

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const ThemeContext = createContext({});
const DOXLEThemeProvider = (children: any) => {
  const [theme, setDOXLETheme] = useState<TDOXLETheme>('light');
  const DOXLE_FONT: IDoxleFont = {
    primaryFont: 'IBMPlexSans-Regular',
    titleFont: 'IBMPlexSans-SemiBold',
    subTitleFont: 'IBMPlexSans-Light',
    secondaryFont: 'WorkSans-Regular',
  };
  const THEME_COLOR: IDOXLEThemeColor = useMemo(
    () => ({
      primaryFontColor: theme === 'light' ? '#000000' : '#ffffff',
      primaryReverseFontColor: theme === 'light' ? '#ffffff' : '#000000',
      primaryBackgroundColor: theme === 'light' ? '#EFF0F4' : '#1F212A',
      primaryContainerColor: theme === 'light' ? '#FFFFFF' : '#07070A',
      primaryBackdropColor:
        theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
      primaryReverseBackdropColor:
        theme === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
      primaryDividerColor: theme === 'light' ? '#EFF0F4' : '#1F212A',
    }),
    [theme],
  );
  const themeContextValue: IDOXLEThemeProviderContext = {
    DOXLE_FONT,
    THEME_COLOR,
    theme,
    setDOXLETheme,
  };
  return <ThemeContext.Provider {...children} value={themeContextValue} />;
};
const useDOXLETheme = () => useContext(ThemeContext);
export {DOXLEThemeProvider, useDOXLETheme};
