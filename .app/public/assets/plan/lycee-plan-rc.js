import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="RC"
    width={1700}
    height={2000}
    {...props}
  >
    <Defs></Defs>
    <G id="Sud">
      <Path
        id="S001"
        d="M354 361h124v71H354z"
        className="cls-1"
        data-name="S001"
      />
      <Path
        id="Salle_Polyvalente"
        d="M0 361h103v143H0z"
        className="cls-1"
        data-name="-e-Salle Polyvalente"
      />
    </G>
    <G id="Nord">
      <Path
        id="_CDI"
        d="M624 36h187v144H624z"
        className="cls-1"
        data-name="CDI"
      />
      <Path
        id="N002"
        d="M853 36h124v71H853z"
        className="cls-1"
        data-name="N002"
      />
    </G>
    <G id="Autre">
      <Path
        id="_-e-"
        d="M853 504h394V361h-83V181h-42v-18h-19v18h-22v-18h-20v18H957v180H853v143Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--2"
        d="M103 504h63l-1-129h-62v129Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--3"
        d="M250 361h82v71h-82z"
        className="cls-3"
        data-name="-e-"
      />
      <Path
        id="_-e--4"
        d="M250 451h228v53H250z"
        className="cls-3"
        data-name="-e-"
      />
      <Path
        id="_-e--5"
        d="M479 361h165v143H479z"
        className="cls-3"
        data-name="-e-"
      />
      <Path
        id="_-e--6"
        d="M166 360h83V181h-83v179Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--7"
        d="M0 0h103v18h22V0h82v108l-62-1v19h62v54h-82v-36H0V0Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--8"
        d="M229 0h82v36h84V0h41v36h63V0h41v36h83v71H229V0Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--9"
        d="M520 126h103v54H520v-54Zm0 0"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--10"
        d="M478 126v54H229v-54h249Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--11"
        d="M770 0h41v35h-41z"
        className="cls-3"
        data-name="-e-"
      />
      <Path
        id="_-e--12"
        d="M812 36v71h40V36h-40Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--13"
        d="M978 36h21V0h40v107h-61V36Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--14"
        d="M1061 0h62v36h84V0h82v107h-228V0Z"
        className="cls-2"
        data-name="-e-"
      />
      <Path
        id="_-e--15"
        d="M1289 180v-54H874v18h-21v36h207v-18h22v18h20v-18h21v18h166Z"
        className="cls-2"
        data-name="-e-"
      />
    </G>
  </Svg>
)
export default SvgComponent
