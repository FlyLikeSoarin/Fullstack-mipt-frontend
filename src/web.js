const API_URL = "http://192.168.0.105:8080";
const STATUS = {
  EMPTY: "EMPTY",
  FETCHING: "FETCHING",
  FAILURE: "FAILURE",
  USER_EXISTS: "USER_EXISTS",
  NOT_SUCCESSFUL: ["EMPTY", "FETCHING", "FAILURE", "USER_EXISTS"],

  SUCCESS: "SUCCESS",
}

const fetchOptions = {}

fetchOptions.get = {
  method: "GET",
  mode: "cors",
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization, Origin, Accept",
    'Origin': 'http://localhost:3030',
  }
}

fetchOptions.post = {
  method: "POST",
  mode: "cors",
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization, Origin, Accept",
    'Origin': 'http://localhost:3030',
  }
}

function getThumbnail(url) {
  // var id_pattern = /watch?v=.*/;
  var vid_id = url.match(/watch\?v=.*/g)[0].substr(8);
  return `https://img.youtube.com/vi/${vid_id}/default.jpg`
}

export {
  API_URL,
  STATUS,
  fetchOptions,
  getThumbnail,
}
