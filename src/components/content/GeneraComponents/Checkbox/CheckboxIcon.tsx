import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';

export const CheckedIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}>
    <G filter="url(#a)">
      <Rect width={6.8} height={6.8} x={5} y={1} fill="#12B718" rx={0.5} />
      <G clipPath="url(#b)">
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.6}
          d="m10.687 2.75-3.062 3.5-1.313-1.313M-26127.9-1078.95h4.5c.2 0 .4-.17.4-.39v-4.51c0-.21-.2-.39-.4-.39h-4.5c-.3 0-.4.18-.4.39v4.51c0 .22.1.39.4.39Z"
        />
      </G>
      <Path
        stroke="#6D778C"
        strokeLinejoin="round"
        strokeWidth={0.5}
        d="M11.475 1h-5.95A.525.525 0 0 0 5 1.525v5.95c0 .29.235.525.525.525h5.95c.29 0 .525-.235.525-.525v-5.95A.525.525 0 0 0 11.475 1Z"
      />
    </G>
    <Defs>
      <ClipPath id="b">
        <Path fill="#fff" d="M5 1h7v7H5z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const UnCheckedIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={9}
    fill="none"
    {...props}>
    <Path
      stroke="#6D778C"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M7.475 1h-5.95A.525.525 0 0 0 1 1.525v5.95c0 .29.235.525.525.525h5.95C7.765 8 8 7.765 8 7.475v-5.95A.525.525 0 0 0 7.475 1Z"
    />
  </Svg>
);
