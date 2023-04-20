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
export const EditTimelineMenuDeleteIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    style={{marginRight: 2}}
    {...props}>
    <Path
      fill="#fff"
      d="M5 15.833c0 .917.75 1.667 1.667 1.667h6.666c.917 0 1.667-.75 1.667-1.667v-10H5v10ZM6.667 7.5h6.666v8.333H6.667V7.5Zm6.25-4.167-.834-.833H7.917l-.834.833H4.167V5h11.666V3.333h-2.916Z"
    />
  </Svg>
);

export const EditTimelineMenuSaveIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
    style={{marginRight: 2}}>
    <Path
      fill="#fff"
      d="M14.167 17.292H5.833A2.292 2.292 0 0 1 3.542 15V5a2.292 2.292 0 0 1 2.291-2.292h6.25c.166 0 .325.066.442.184l3.75 3.775a.625.625 0 0 1 .183.441V15a2.292 2.292 0 0 1-2.291 2.292ZM5.833 3.958A1.042 1.042 0 0 0 4.792 5v10a1.042 1.042 0 0 0 1.041 1.042h8.334A1.042 1.042 0 0 0 15.208 15V7.342l-3.383-3.384H5.833Z"
    />
    <Path
      fill="#fff"
      d="M13.958 16.667h-1.25v-5.209H7.292v5.209h-1.25V11.25a1.042 1.042 0 0 1 1.041-1.042h5.834a1.042 1.042 0 0 1 1.041 1.042v5.417Zm-3.566-9.375H7.108a1.075 1.075 0 0 1-1.066-1.084V3.333h1.25v2.709h2.916V3.333h1.25v2.875a1.075 1.075 0 0 1-1.066 1.084Z"
    />
  </Svg>
);
