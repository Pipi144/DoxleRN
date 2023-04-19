import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';

export const CheckboxPositive = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}>
    <G>
      <Rect width={6.8} height={6.8} x={5} y={1} fill="#12B718" rx={0.5} />
      <G clipPath="url(#b)">
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.6}
          d="m11.313 2.25-3.938 4.5-1.688-1.688M-33595.5-1388.5h5.8c.3 0 .5-.23.5-.5v-5.8c0-.28-.2-.5-.5-.5h-5.8c-.3 0-.5.22-.5.5v5.8c0 .27.2.5.5.5Z"
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
        <Path fill="#fff" d="M4 0h9v9H4z" />
      </ClipPath>
    </Defs>
  </Svg>
);
