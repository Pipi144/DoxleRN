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
