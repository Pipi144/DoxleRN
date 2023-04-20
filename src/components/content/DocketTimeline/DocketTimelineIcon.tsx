import Svg, {Path, SvgProps} from 'react-native-svg';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
interface IActionsIconColor {
  themeColor: IDOXLEThemeColor;
}
export const DocketTimelineIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
    style={{marginLeft: 4}}>
    <Path
      stroke="#242424"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 3.75h-15A2.25 2.25 0 0 0 2.25 6v13.5a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25Z"
    />
    <Path
      fill="#242424"
      d="M13.875 12a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM17.625 12a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM13.875 15.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM17.625 15.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM6.375 15.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM10.125 15.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM6.375 19.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM10.125 19.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25ZM13.875 19.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
    />
    <Path
      stroke="#242424"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 2.25v1.5M18 2.25v1.5"
    />
    <Path
      stroke="#242424"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.75 7.5H2.25"
    />
  </Svg>
);

export const EditTimelineMenuCloseIcon = ({themeColor}: IActionsIconColor) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <Path
      fill={themeColor.primaryFontColor}
      d="m12 13.4-4.9 4.9a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7l4.9-4.9-4.9-4.9a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275l4.9 4.9 4.9-4.9a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7L13.4 12l4.9 4.9a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275L12 13.4Z"
    />
  </Svg>
);
