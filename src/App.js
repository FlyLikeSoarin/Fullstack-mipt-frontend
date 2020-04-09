import React from 'react';
import {
  Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import store from './store/store.js';
import history from './history';
import { fetchRooms, fetchRoomUsers, fetchRoomEntries } from './store/actions.js';

import LoginManager from "./components/LoginManager.js";
import RoomManager from "./components/RoomManager.js";
import BrowseManager from "./components/BrowseManager.js";


function updateState() {
  store.dispatch(fetchRooms(store.getState().auth.authToken))
  if (store.getState().variables.currentRoomID !== undefined) {
    store.dispatch(fetchRoomEntries(
      store.getState().variables.currentRoomID,
      store.getState().auth.authToken,
    ));
    store.dispatch(fetchRoomUsers(
      store.getState().variables.currentRoomID,
      store.getState().auth.authToken,
    ));
  }
  
}


class App extends React.Component {
  constructor(props) {
    super(props);
    setInterval(() => (updateState()), 1000)
  }

  render() {
    let foreground = {zIndex: "9999999"};
    return (
      <Router history={history}>
        <Route path="/login" component={LoginManager}/>
        <Route path="/register" component={LoginManager}/>
        <Route path="/browse" component={BrowseManager}/>
        <Route path="/room/:id" component={RoomManager} />
        <Route exact={true} path="/" render={()=>("Home page!")}/>
        <br/>
        <div name="debugNavigation" style={foreground}>
          <Link to="/login" style={{color: 'black', textDecoration: 'None'}}> Login Page </Link>
          <Link to="/browse" style={{color: 'black', textDecoration: 'None'}}> Browser </Link>
          <Link to="/room" style={{color: 'black', textDecoration: 'None'}}> Room </Link>
        </div>
      </Router>
    );
  }
}

export default App;

// export default function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>
//
//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }
//
// function Home() {
//   return <h2>Home</h2>;
// }
//
// function About() {
//   return <h2>About</h2>;
// }
//
// function Users() {
//   return <h2>Users</h2>;
// }
