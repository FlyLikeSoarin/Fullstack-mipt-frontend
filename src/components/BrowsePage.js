import React from "react";
import {Media, Player, controls} from "react-media-player";
import {
  CenteredContainer,
  SmoothDiv,
  SmoothSolidWhiteDiv,
  SmoothSolidBlackDiv,
  RowFlexContainer,
  ColumnFlexContainer,
  StyledButton,
  StyledInput,
  MiniBanner,
  ScrollBody,
  Banner,
} from "./SharedStyledComponents";
import RoomEntry from "./RoomEntry";
import "../styles/gradient.css";

const { PlayPause, MuteUnmute } = controls

function createRooms(rooms) {
  var roomEntries = []
  for (var roomID in rooms) {
    roomEntries.push(<RoomEntry title={rooms[roomID].title} id={roomID} />);
  }
  return roomEntries;
}

class BrowsePage extends React.Component {
  constructor(props) {
    super(props);
    props.update(props.token, props.status);
    this.formRef = React.createRef();
    this.joinRef = React.createRef();
  }

  render() {
    const {
      rooms, token, status,
      create, update, join,
    } = this.props;

    let grow = {width: '150px'};
    let scrollHeight = {height: "calc(100% - 40px)"};
    let browsePanel = {height: "60%", width: "40%"};
    let smoothSolidBlackDiv = {height: "100%", width: "100%"}
    let bannerPosition = {position: 'fixed', top: '0px', left: '0px'};

    let RoomComponents = createRooms(rooms);

    return (
      <CenteredContainer className="gradient-static">
        <Banner style={bannerPosition}>
          Broadcast
        </Banner>
        <RowFlexContainer style={browsePanel}>
          <SmoothDiv style={smoothSolidBlackDiv} >
            <MiniBanner>
              Your rooms:
              <p/>
            </MiniBanner>
            <ScrollBody style={scrollHeight}>
              {RoomComponents}
            </ScrollBody>
            <p/>
            <form id="room-creation-form"
                  onSubmit={evt => create(evt, this.formRef, token, status)}
                  ref={this.formRef}
            >
              <RowFlexContainer>
                <StyledInput id="create-title" placeholder="Title…" type="text" />
                <StyledInput id="create-access-code" placeholder="Access code…" type="password" />
                <StyledButton onClick={()=>{this.formRef.current.dispatchEvent(new Event('submit'))}}
                              style={grow}
                > CREATE</StyledButton>
              </RowFlexContainer>
            </form>

            <form id="room-creation-form"
                  onSubmit={evt => join(evt, this.joinRef, token, status)}
                  ref={this.joinRef}
            >
              <RowFlexContainer>
                <StyledInput id="join-id" placeholder="ID…" type="text" />
                <StyledInput id="join-access-code" placeholder="Access code…" type="password" />
                <StyledButton onClick={()=>{this.joinRef.current.dispatchEvent(new Event('submit'))}}
                              style={grow}
                > JOIN </StyledButton>
              </RowFlexContainer>
            </form>
          </SmoothDiv>
        </RowFlexContainer>
      </CenteredContainer>
    );
  }
};

export default BrowsePage;
