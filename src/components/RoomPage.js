import React from "react";
import {Media, Player, controls} from "react-media-player";
import {
  CenteredContainer,
  SmoothDiv,
  RowFlexContainer,
  ColumnFlexContainer,
  StyledButton,
  StyledInput,
  Banner,
} from "./SharedStyledComponents";
import QueueEntry from "./QueueEntry";
import "../styles/gradient.css";

const { PlayPause, MuteUnmute } = controls

class RoomPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let grow = {flexGrow: "1"};
    let leftMargin = {marginLeft: "10px"};

    return (
      <CenteredContainer className="gradient-static">
        <Media>
          <RowFlexContainer>
            <ColumnFlexContainer>
              <div className="media">
                <Player display="none" src="https://www.youtube.com/watch?v=-uAZdIJIl8o" vendor="audio" useAudioObject={true} />
              </div>
              <div>
                <RowFlexContainer>
                  <StyledInput style={grow} />
                  <StyledButton> Broadcast </StyledButton>
                </RowFlexContainer>
              </div>
            </ColumnFlexContainer>
            <SmoothDiv style={leftMargin}>
              Queue
              <QueueEntry />
            </SmoothDiv>
          </RowFlexContainer>
        </Media>
      </CenteredContainer>
    );
  }
};

export default RoomPage;
