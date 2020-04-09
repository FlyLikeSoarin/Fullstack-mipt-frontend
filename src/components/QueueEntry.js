import React from "react";
import styled from "styled-components";
import {
  RowFlexContainer,
  ColumnFlexContainer,
  MiniBanner,
  MicroBanner,
  SmoothSolidWhiteDiv,
} from "./SharedStyledComponents";

const Thumbnail = styled.img`
  width: 80px;
  height: 60px;
`

function QueueEntry(props) {
  let blackText = {color: "black", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"};
  let panelDimentions = {width: "350px"};
  let divColor = {backgroundColor: props.playing ? 'red' : 'white'};

  return(
    <div>
      <SmoothSolidWhiteDiv onClick={props.onClick} style={ divColor }>
        <RowFlexContainer>
          <ColumnFlexContainer>
            <MiniBanner style={Object.assign({}, panelDimentions, blackText)}>
              {props.title}
            </MiniBanner>
            <MicroBanner style={blackText}>
              Duration - {props.duration.toString()} seconds
            </MicroBanner>
          </ColumnFlexContainer>
          <Thumbnail src={props.thumbUrl}>
          </Thumbnail>
        </RowFlexContainer>
      </SmoothSolidWhiteDiv>
      <p/>
    </div>
  );
}

export default QueueEntry;
