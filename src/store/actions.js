import fetch from 'cross-fetch';
import {API_URL, STATUS, fetchOptions} from '../web.js';
import {
  UPDATE_LOGIN,
  LOGIN,
  REGISTER,
  UPDATE_PROFILE,
  FETCH_PROFILE,
  UPDATE_ROOMS,
  FETCH_ROOMS,
  UPDATE_ROOM_ENTRIES,
  FETCH_ROOM_ENTRIES,
  UPDATE_ROOM_USERS,
  FETCH_ROOM_USERS,
  POST_ENTRY,
  UPLOAD_ENTRY,
  POST_ROOM,
  CREATE_ROOM,
  POST_ADD_ROOM,
  JOIN_ROOM,
  SET_ROOM,
  SET_ENTRY,
  SET_URL,
  RESET,
} from './actionTypes.js'

function updateLogin(status, json) {
  if ([STATUS.FETCHING, STATUS.FAILURE, STATUS.USER_EXISTS, STATUS.EMPTY].includes(status)) {
    return {
      type: UPDATE_LOGIN,
      status: status,
    }
  } else if (status == STATUS.SUCCESS) {
    return {
      type: UPDATE_LOGIN,
      status: status,
      token: json.token,
    }
  }
}

function login(username, password) {

  return function(dispatch) {
    dispatch(reset())
    dispatch(updateLogin(STATUS.FETCHING))

    return fetch(
      API_URL +
      `/auth/login?username=${username}&password=${password}`,
      fetchOptions.post
    ).then(
      response => response.json(),
      error => {
        // Resolve error
        alert(error);
        dispatch(updateLogin(STATUS.FAILURE))
        throw new Error()
      }
    ).then(
      json => {
        if (json.status == 'success') {
          dispatch(updateLogin(STATUS.SUCCESS, json));
        } else {
          alert('Operation failed. Reason: ' + json.token);
          throw new Error()
        }
      }
    ).catch( error => {
      dispatch(updateRooms(STATUS.FAILURE))
    })
  }
}

function logout() {
  return {
    type: RESET,
  }
}

function register(username, email, password) {

  return function(dispatch) {
    dispatch(reset())
    dispatch(updateLogin(STATUS.FETCHING))

    return fetch(
      API_URL +
      `/auth/register?username=${username}&email=${email}&password=${password}`,
      fetchOptions.post
    ).then(
      response => response.json(),
      error => {
        // Resolve error
        alert(error);
        dispatch(updateLogin(STATUS.USER_EXISTS))
        throw new Error()
      }
    ).then(
      json => {
        if (json.status == 'success') {
          dispatch(updateLogin(STATUS.SUCCESS, json));
        } else {
          alert('Operation failed. Reason: ' + json.token);
          throw new Error()
        }
      }
    ).catch( error => {
      dispatch(updateRooms(STATUS.USER_EXISTS))
    })
  }
}


function updateProfile(status, json) {
  if ([STATUS.FETCHING, STATUS.FAILURE].includes(status)) {
    return {
      type: UPDATE_PROFILE,
      status: status,
    }
  } else if (status == STATUS.SUCCESS) {
    return {
      type: UPDATE_PROFILE,
      status: status,
      id: json.id,
      username: json.username,
    }
  }
}

function fetchProfile(token) {

  return function(dispatch) {
    dispatch(updateProfile(STATUS.FETCHING))

    return fetch(
      API_URL +
      '/api/user/me' +
      `?token=${token}`,
      fetchOptions.get
    ).then(
      response => response.json(),
      error => {
        // Resolve error
        dispatch(updateProfile(STATUS.FAILURE))
      }
    ).then(
      json => dispatch(updateProfile(STATUS.SUCCESS, json))
    )
  }
}


function updateRooms(status, json) {
  if ([STATUS.FETCHING, STATUS.FAILURE].includes(status)) {
    return {
      type: UPDATE_ROOMS,
      status: status,
    }
  } else if (status == STATUS.SUCCESS) {
    return {
      type: UPDATE_ROOMS,
      status: status,
      rooms: json
    }
  }
}

function fetchRooms(token) {

  return function(dispatch) {
    dispatch(updateRooms(STATUS.FETCHING))

    return fetch(
      API_URL +
      '/api/room/list' +
      `?token=${token}`,
      fetchOptions.get
    ).then(
      response => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error(response.status)
        }
      },
      error => {
        throw new Error(error)
      }
    ).then(
      json => dispatch(updateRooms(STATUS.SUCCESS, json))
    ).catch( error => {
      dispatch(updateRooms(STATUS.FAILURE))
    })
  }
}


function updateRoomEntries(status, room_id, json) {
  if ([STATUS.FETCHING, STATUS.FAILURE].includes(status)) {
    return {
      type: UPDATE_ROOM_ENTRIES,
      status: status,
      room_id: room_id,
    }
  } else if (status == STATUS.SUCCESS) {
    return {
      type: UPDATE_ROOM_ENTRIES,
      status: status,
      room_id: room_id,
      entries: json,
    }
  }
}

function fetchRoomEntries(room_id, token) {

  return function(dispatch) {
    dispatch(updateRoomEntries(STATUS.FETCHING, room_id))

    return fetch(
      API_URL +
      `/api/room/${room_id}/list_entries` +
      `?token=${token}`,
      fetchOptions.get
    ).then(
      response => response.json(),
      error => {
        // Resolve error
        dispatch(updateRoomEntries(STATUS.FAILURE, room_id))
      }
    ).then(
      json => dispatch(updateRoomEntries(STATUS.SUCCESS, room_id, json))
    )
  }
}


function updateRoomUsers(status, room_id, json) {
  if ([STATUS.FETCHING, STATUS.FAILURE].includes(status)) {
    return {
      type: UPDATE_ROOM_USERS,
      status: status,
      room_id: room_id,
    }
  } else if (status == STATUS.SUCCESS) {
    return {
      type: UPDATE_ROOM_USERS,
      status: status,
      room_id: room_id,
      users: json,
    }
  }
}

function fetchRoomUsers(room_id, token) {

  return function(dispatch) {
    dispatch(updateRoomUsers(STATUS.FETCHING, room_id))

    return fetch(
      API_URL +
      `/api/room/${room_id}/list_users` +
      `?token=${token}`,
      fetchOptions.get
    ).then(
      response => response.json(),
      error => {
        // Resolve error
        dispatch(updateRoomUsers(STATUS.FAILURE, room_id))
      }
    ).then(
      json => dispatch(updateRoomUsers(STATUS.SUCCESS, room_id, json))
    )
  }
}


function postEntry(status, room_id) {
  return {
    type: POST_ENTRY,
    status: status,
    room_id: room_id,
  }
}

function uploadEntry(room_id, url, token) {

  return function(dispatch) {
    dispatch(postEntry(STATUS.FETCHING, room_id), )

    return fetch(
      API_URL +
      `/api/room/${room_id}/add_entry?url=${url}` +
      `&token=${token}`,
      fetchOptions.post
    ).then(
      response => response.json(),
      error => {
        // Resolve error
        dispatch(postEntry(STATUS.FAILURE, room_id))
      }
    ).then(
      json => {
        dispatch(postEntry(STATUS.SUCCESS, room_id))
        dispatch(fetchRoomEntries(room_id))
      }
    )
  }
}


function postRoom(status) {
  return {
    type: POST_ROOM,
    status: status,
  };
}

function createRoom(title, access_code, token) {

  return function(dispatch) {
    dispatch(postRoom(STATUS.FETCHING))

    return fetch(
      API_URL +
      `/api/room/create?title=${title}&access_code=${access_code}` +
      `&token=${token}`,
      fetchOptions.post
    ).then(
      response => response.json(),
      error =>{
        // resolving error
        dispatch(createRoom(STATUS.FAILURE))
      }
    ).then(
      json => {
        dispatch(createRoom(STATUS.SUCCESS))
        dispatch(fetchRooms())
      }
    )
  }
}


function postAddRoom(status) {
  return {
    type: POST_ADD_ROOM,
    status: status,
  };
}

function joinRoom(room_id, access_code, token) {

  return function(dispatch) {
    dispatch(postAddRoom(STATUS.FETCHING));

    return fetch(
      API_URL +
      `/api/room/${room_id}/join?access_code=${access_code}` +
      `&token=${token}`,
      fetchOptions.post
    ).then(
      response => response.json(),
      error => {
        // resolving error
        dispatch(postAddRoom(STATUS.FAILURE));
      }
    ).then(
      json => {
        console.log(json);
        dispatch(postAddRoom(STATUS.SUCCESS));
        dispatch(fetchRooms());
      }
    )
  }
}


function setRoom(id) {
  return {
    type: SET_ROOM,
    id: id,
  };
}


function setEntry(position) {
  return {
    type: SET_ENTRY,
    position: position,
  };
}


function nextEntry() {
  return {
    type: SET_ENTRY,
    position: 'next',
  };
}


function setUrl(url) {
  return {
    type: SET_URL,
    url: url,
  }
}


function reset() {
  return {
    type: RESET,
  }
}


export {
  updateLogin,
  login,
  register,
  updateProfile,
  fetchProfile,
  updateRooms,
  fetchRooms,
  updateRoomUsers,
  fetchRoomUsers,
  updateRoomEntries,
  fetchRoomEntries,
  postEntry,
  uploadEntry,
  postRoom,
  createRoom,
  postAddRoom,
  joinRoom,
  setRoom,
  setEntry,
  setUrl,
  nextEntry,
}
