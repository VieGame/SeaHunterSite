import * as React from "react";
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={27}
    height={50}
    viewBox="0 0 27 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 2L25 25L2 48"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ChevronRightIcon;