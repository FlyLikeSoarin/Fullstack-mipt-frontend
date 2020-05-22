import React from "react";
import {SmoothSolidWhiteDiv} from "./SharedStyledComponents.js";
import { Link } from "react-router-dom"

// Get youtube title snippet:

function RoomEntry({title, id}) {
  let divFontMargin = {
    fontWeight: "bold",
    marginBottom: "10px",
    marginRight: "20px",
  }
  return(
    <div>
      <Link to={'/room/' + id + '/'} style={{color: 'black', textDecoration: 'None'}}>
        <SmoothSolidWhiteDiv style={divFontMargin}>
          {title}
        </SmoothSolidWhiteDiv>
      </Link>
    </div>
  );
}

export default RoomEntry;
