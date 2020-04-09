import { connect } from 'react-redux';
import { fetchRooms, createRoom, joinRoom } from '../store/actions.js';
import { STATUS } from '../web.js';
import history from '../history.js';

import BrowsePage from './BrowsePage.js';
import RoomPage from './RoomPage.js'


const mapStateToProps = state => ({
  rooms: state.data.rooms,
  token: state.auth.authToken,
  status: state.auth.authStatus,
});

const mapDispatchToProps = dispatch => ({
  update: (token, status) => {
    if (status == STATUS.SUCCESS) {
      dispatch(fetchRooms(token));
    } else if (status == STATUS.FETCHING) {
      // pass
    } else {
      history.push('/login');
    }
  },
  create: (evt, ref, token, status) => {
    if (status == STATUS.SUCCESS) {
      var title = ref.current[0].value;
      var access_code = ref.current[1].value;
      ref.current.reset()
      dispatch(createRoom(title, access_code, token));
    } else {
      history.push('/login');
    }
  },
  join: (evt, ref, token, status) => {
    if (status == STATUS.SUCCESS) {
      var id = ref.current[0].value;
      var access_code = ref.current[1].value;
      ref.current.reset()
      dispatch(joinRoom(id, access_code, token));
    } else {
      history.push('/login');
    }
  },
});


const BrowseManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowsePage);

export default BrowseManager;
