import React from "react";
import {Media, Player} from "react-media-player";
import {Link} from "react-router-dom";
import {
  CenteredContainer,
  // ScreenContainer,
  SmoothDiv,
  // SmoothSolidWhiteDiv,
  RowFlexContainer,
  ColumnFlexContainer,
  StyledButton,
  StyledInput,
  Banner,
  MiniBanner,
  ScrollBody,
} from "./SharedStyledComponents";
import QueueEntry from "./QueueEntry";
// import MediaController from "./MediaController";
import "../styles/gradient.css";
import { getThumbnail } from "../web.js";

// const { PlayPause, MuteUnmute } = controls

function roomEntries(entries, callback, update, playing) {
    try {
      let i = -1
      return entries.map((entry) => {
        i++;
        return <QueueEntry
          title={entry.title.substr(0, 150)}
          duration={entry.duration}
          thumbUrl={getThumbnail(entry.url)}
          playing={(i === playing)}
          onClick={((i) => (() => {
            callback(i);
          }))(i)}
        />
      }).reverse()
    } catch(error) {
      console.log(error);
      return [];
    }
}

class RoomPage extends React.Component {
  constructor(props) {
    super(props);

    const {id, token, status, update, prepare} = this.props;

    update(id, token, status);
    prepare(id);

    this.formRef = React.createRef();
  }

  updateUrl(evt) {
    const {playNext, entries, playingPos, playingUrl, updateUrl} = this.props
    if (evt.progress === 1) {
      playNext();
    }
    if (entries !== undefined && playingPos !== undefined) {
      if (entries[playingPos] !== undefined) {
        if (entries[playingPos].url !== undefined) {
          if (entries[playingPos].url !== playingUrl) {
            updateUrl(entries[playingPos].url)
          }
        }
      }
    }
  }

  render() {
    const {
      id,
      title,
      // users,
      entries,
      upload,
      token,
      status,
      playingPos,
      playingUrl,
      // updateUrl,
      setPlaying,
    } = this.props;

    let grow = {flexGrow: "1"};
    let leftMargin = {marginLeft: "10px"};
    let panelDimentions = {height: "400px", width: "800px"};
    // let absolute = {position: 'absolute'}
    let scrollHeight = {height: "calc(100%)", width: '470px'};
    let bannerPosition = {position: 'fixed', top: '0px', left: '0px'};
    let titlePosition = {position: 'relative', top: '-10px'};

    const RoomEntries = roomEntries(entries, setPlaying, this.updateUrl.bind(this), playingPos);

    return (
      <CenteredContainer className="gradient-static">
        <div style={bannerPosition}>
          <RowFlexContainer>
            <Banner>
              Broadcast
            </Banner>
            <Link to="/browse" style={{color: 'black', textDecoration: 'None'}}>
              <Banner>
                Rooms
              </Banner>
            </Link>
          </RowFlexContainer>
        </div>
        <Media>

          <RowFlexContainer style={panelDimentions}>
            <ColumnFlexContainer>
              <div className="media">
                <MiniBanner style={titlePosition}>
                  {title} {'\t'} <text style={{color: 'LightGrey'}}> (id: {id}) </text>
                </MiniBanner>
                <Player display="none" src={playingUrl} vendor="audio" autoPlay={true} useAudioObject={true} onTimeUpdate={this.updateUrl.bind(this)} />
              </div>
              <div>
                <RowFlexContainer>
                  <form id="upload-form"
                        onSubmit={evt => upload(evt, this.formRef, id, token, status)}
                        ref={this.formRef}
                        style={grow}
                  >
                    <RowFlexContainer>
                      <StyledInput id="upload-url" placeholder="URL..." type="text" style={grow} />
                      <StyledButton onClick={()=>{this.formRef.current.dispatchEvent(new Event('submit'))}}> Broadcast </StyledButton>
                    </RowFlexContainer>
                  </form>
                </RowFlexContainer>
              </div>
            </ColumnFlexContainer>
            <SmoothDiv style={leftMargin}>
              <ScrollBody style={scrollHeight}>
                {RoomEntries}
              </ScrollBody>
            </SmoothDiv>
          </RowFlexContainer>
        </Media>
      </CenteredContainer>
    );
  }
};

export default RoomPage;
