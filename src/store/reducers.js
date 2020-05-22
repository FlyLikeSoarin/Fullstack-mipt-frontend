import {STATUS} from '../web.js';
import {
  UPDATE_LOGIN,
  UPDATE_PROFILE,
  UPDATE_ROOMS,
  UPDATE_ROOM_ENTRIES,
  UPDATE_ROOM_USERS,
  POST_ENTRY,
  SET_ROOM,
  SET_ENTRY,
  SET_URL,
  RESET,
} from './actionTypes.js'


function dataReducer(data = {
  rooms: {},
  roomsFetchStatus: STATUS.EMPTY,
}, action) {
  switch (action.type) {
    case UPDATE_ROOMS:
      if (action.status in STATUS.NOT_SUCCESSFUL) {
        return Object.assign({}, data, {
          roomsFetchStatus: action.status
        });
      } else {
        return Object.assign({}, data, {
          roomsFetchStatus: action.status,
          rooms: roomListReducer(data.rooms, action)
        })
      }

    default:
      return Object.assign({}, data, {
        rooms: roomListReducer(data.rooms, action),
      });
  }
}


function roomListReducer(rooms = {}, action) {
  switch (action.type) {
    case UPDATE_ROOMS:
      var updatedRooms = Object.assign({}, rooms)
      for (var id in action.rooms) {
        if (id !== undefined) {
          updatedRooms[action.rooms[id].id] = Object.assign({}, roomReducer(rooms[id], action), action.rooms[id])
        }
      }
      return Object.assign({}, rooms, updatedRooms)

    default:
      if (action.room_id !== undefined) {
        updatedRooms = Object.assign({}, rooms);
        updatedRooms[action.room_id] = roomReducer(rooms[action.room_id], action);
        return Object.assign({}, rooms, updatedRooms);
      }
      return rooms;
  }
}

function roomReducer(room={
  users: [],
  usersFetchStatus: STATUS.EMPTY,
  entries: [],
  entriesFetchStatus: STATUS.EMPTY,
  postEntryStatus: STATUS.EMPTY,
}, action) {
  switch (action.type) {
    // case UPDATE_ROOMS:
    //   return Object.assign({}, room, {
    //     id: action.id,
    //     title: action.title,
    //     currentlyPlaying: action.currentlyPlaying,
    //   });
    case UPDATE_ROOM_USERS:
      if (action.status in STATUS.NOT_SUCCESSFUL) {
        return Object.assign({}, room, {
          usersFetchStatus: action.status,
        });
      }
      else {
        return Object.assign({}, room, {
          usersFetchStatus: action.status,
          users: action.users,
        });
      }
    case UPDATE_ROOM_ENTRIES:
      if (STATUS.NOT_SUCCESSFUL.includes(action.status)) {
        return Object.assign({}, room, {
          entriesFetchStatus: action.status,
        });
      }
      else {
        if (action.entries.length > room.entries) {
          for (var intersection = 0; intersection < room.entries; intersection++) {
            if (room.entries[intersection].id === action.entries.slice(-1)[0].id) {
              break;
            }
          }
          // var prefix = action.entries.length - intersection;

          return Object.assign({}, room, {
            entriesFetchStatus: action.status,
            entries: room.entries.concat(action.entries.slice(intersection)),
          });
        } else {
          return Object.assign({}, room, {
            entriesFetchStatus: action.status,
          });
        }
      }
    case POST_ENTRY:
      return Object.assign({}, room, {
        postEntryStatus: action.status,
      })
    default:
      return room;
  }
}

function authReducer(auth = {
  authToken: undefined,
  authStatus: STATUS.EMPTY,
  profileFetchStatus: STATUS.EMPTY,
  profile: {
    id: undefined,
    username: undefined,
  }
}, action) {
  switch (action.type) {
    case UPDATE_LOGIN:
      return Object.assign({}, auth, {
        authStatus: action.status,
        authToken: action.token,
      });

    case UPDATE_PROFILE:
      if (action.status in STATUS.NOT_SUCCESSFUL) {
        return Object.assign({}, auth, {
          profileFetchStatus: action.status,
        });
      }
      else {
        return Object.assign({}, auth, {
          profileFetchStatus: action.status,
          profile: {
            id: action.id,
            username: action.username,
          }
        });
      }

    default:
      return auth;
  }
}

function variablesReducer(variables={
  currentRoomID: undefined,
  currentlyPlaying: 0,
  currentUrl: 'https://www.youtube.com/watch?v=QggJzZdIYPI',
}, action) {
  switch (action.type) {
    case SET_ROOM:
      return Object.assign({}, variables, {currentRoomID: action.id});
    case SET_ENTRY:
      if (action.position === 'next' && variables.currentlyPlaying !== undefined) {
        return Object.assign({}, variables, {currentlyPlaying: variables.currentlyPlaying + 1})
      }
      return Object.assign({}, variables, {currentlyPlaying: action.position});
    case SET_URL:
      return Object.assign({}, variables, {currentUrl: action.url});
    default:
      return variables;
  }
}

function reducer(state={}, action) {
  switch (action.type) {
    case RESET:
      return Object.assign({}, state, {
        data: dataReducer(undefined, action),
        auth: authReducer(undefined, action),
        variables: variablesReducer(undefined, action),
      });

    default:
      return Object.assign({}, state, {
        data: dataReducer(state.data, action),
        auth: authReducer(state.auth, action),
        variables: variablesReducer(state.variables, action),
      });
  }
}

export default reducer
