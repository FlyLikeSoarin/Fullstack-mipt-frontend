import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRoomUsers, fetchRoomEntries, uploadEntry, setRoom, setEntry, nextEntry, setUrl } from '../store/actions.js';
import { STATUS } from '../web.js';
import history from '../history.js';
import state from '../store/store.js';

import RoomPage from './RoomPage.js'

const mapStateToProps = (state, ownProps) => {
  try {
    return {
      id: ownProps.match.params.id,
      title: state.data.rooms[ownProps.match.params.id].title,
      playingPos: state.variables.currentlyPlaying,
      playingUrl: state.variables.currentUrl,

      postStatus: state.data.rooms[ownProps.match.params.id].postEntryStatus,

      users: state.data.rooms[ownProps.match.params.id].users,
      usersStatus: state.data.rooms[ownProps.match.params.id].usersFetchStatus,

      entries: state.data.rooms[ownProps.match.params.id].entries,
      entriesStatus: state.data.rooms[ownProps.match.params.id].entriesFetchStatus,

      token: state.auth.authToken,
      status: state.auth.authStatus,
    };
  } catch(error) {
    history.push('/login');
  }
};

const mapDispatchToProps = (dispatch) => ({
  update: (id, token, status) => {
    if (status == STATUS.SUCCESS) {
      dispatch(fetchRoomUsers(id, token));
      dispatch(fetchRoomEntries(id, token));
    } else {
      history.push('/login');
    }
  },
  upload: (evt, ref, id, token, status) => {
    if (status == STATUS.SUCCESS) {
      var url = ref.current[0].value;
      ref.current.reset()
      dispatch(uploadEntry(id, url, token));
    } else {
      history.push('/login');
    }
  },
  prepare: (id) => {
    dispatch(setRoom(id));
    dispatch(setEntry(0));
  },
  updateUrl: (url) => {
    try {
      dispatch(setUrl(url)); //'https://www.youtube.com/watch?v=rT_S-ShiOtQ'));
    } catch (error) {
    }
  },
  playNext: () => {
    dispatch(nextEntry());
  },
  setPlaying: (position) => {
    dispatch(setEntry(position));
  },
});


const RoomManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomPage);

export default RoomManager;
