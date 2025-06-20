import React from 'react';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
	xmlns="http://www.w3.org/2000/svg"
	x="0px"
	y="0px"
	width="100"
	height="100"
	viewBox="0 0 256 256"
	{...props}
  >
	<g
	  fill="#d6d6d6"
	  fillRule="nonzero"
	  stroke="none"
	  strokeWidth="1"
	  strokeLinecap="butt"
	  strokeLinejoin="miter"
	  strokeMiterlimit="10"
	  strokeDasharray=""
	  strokeDashoffset="0"
	  fontFamily="none"
	  fontWeight="none"
	  fontSize="none"
	  textAnchor="none"
	  style={{ mixBlendMode: "normal" }}
	>
	  <g transform="scale(5.12,5.12)">
		<path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path>
	  </g>
	</g>
  </svg>
);

export default XIcon;