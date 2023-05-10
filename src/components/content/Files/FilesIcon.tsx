import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


export const FileIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      fill="#7B7BFE"
      d="M38.25 9H23.635a2.24 2.24 0 0 1-1.248-.375l-2.606-1.743A5.228 5.228 0 0 0 16.865 6H9.75a5.256 5.256 0 0 0-5.25 5.25v2.25h39c0-2.895-2.355-4.5-5.25-4.5ZM39.727 42H8.274a5.25 5.25 0 0 1-5.244-5.17L1.517 21.385v-.026A4.5 4.5 0 0 1 6 16.5h36.01a4.5 4.5 0 0 1 4.48 4.86v.025L44.97 36.83A5.25 5.25 0 0 1 39.727 42Z"
    />
  </Svg>
)

