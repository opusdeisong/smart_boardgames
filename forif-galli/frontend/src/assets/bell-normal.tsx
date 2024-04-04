import { SVGDef } from "@/types/svg";
const NormalBell = ({
  width = 300,
  height = 300,
  color = "#000000",
  props,
}: SVGDef) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <style>
        {`.cls-1{fill:none;stroke:${color};stroke-miterlimit:10;stroke-width:1.91px}`}
      </style>
    </defs>
    <path
      className="cls-1"
      d="M22.5 22.5h-21v-1.91l.96-1.91h19.09l.95 1.91zM11.75 5.32h.49a9.3 9.3 0 0 1 9.3 9.3v.25H2.45v-.25a9.3 9.3 0 0 1 9.3-9.3ZM12 1.5v3.82M9.14 1.5h5.72"
    />
    <path className="cls-1" d="M5.32 14.86h13.36v3.82H5.32z" />
  </svg>
);
export default NormalBell;
