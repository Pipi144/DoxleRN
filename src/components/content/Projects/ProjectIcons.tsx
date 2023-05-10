import Svg, {Path, SvgProps} from 'react-native-svg';
import {IDOXLEThemeColor} from '../../../Providers/DoxleThemeProvider';
interface ISvgProps {
  themeColor: IDOXLEThemeColor;
}
export const ProjectDropdownIcon = ({themeColor}: ISvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={9} fill="none">
    <Path
      fill={themeColor.primaryFontColor}
      fillRule="evenodd"
      d="M.283.458a1.25 1.25 0 0 1 1.76-.175l6.474 5.305L14.992.283a1.25 1.25 0 0 1 1.584 1.934L9.31 8.17a1.25 1.25 0 0 1-1.584 0L.458 2.217A1.25 1.25 0 0 1 .283.457Z"
      clipRule="evenodd"
    />
  </Svg>
);
export const ProjectMenuSearchIcon = ({themeColor}: ISvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <Path
      fill={themeColor.primaryFontColor}
      fillRule="evenodd"
      d="M3.75 11a7.25 7.25 0 1 1 14.5 0 7.25 7.25 0 0 1-14.5 0ZM11 2.25a8.75 8.75 0 1 0 5.634 15.445l2.836 2.835a.75.75 0 1 0 1.06-1.06l-2.835-2.836A8.75 8.75 0 0 0 11 2.25Z"
      clipRule="evenodd"
    />
  </Svg>
);
export const ProjectMenuMoreIcon = ({themeColor}: ISvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <Path
      fill={themeColor.primaryFontColor}
      d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-2 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
    />
  </Svg>
);
