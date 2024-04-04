import { SVGDef } from "@/types/svg";
const ActiveBell = ({
  width = 300,
  height = 300,
  color = "#000000",
  props,
}: SVGDef) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M750 750H50v-63.667l32-63.666h636.333L750 686.333zM391.667 177.333H408a310 310 0 0 1 310 310v8.334H81.667v-8.334a310 310 0 0 1 310-310ZM400 117v60m-95-73h190.667"
      stroke={color}
      strokeWidth={63.667}
      strokeMiterlimit={10}
    />
    <path
      d="M622.667 495.333H177.333v127.334h445.334z"
      stroke="#020202"
      strokeWidth={63.667}
      strokeMiterlimit={10}
    />
  </svg>
);
export default ActiveBell;
