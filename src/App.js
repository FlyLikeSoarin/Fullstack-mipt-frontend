import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from "./components/LoginPage.js"
import RoomPage from "./components/RoomPage.js"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let foreground = {zIndex: "9999999"};
    return (
      <Router>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={LoginPage}/>
        <Route path="/default" component={DefaultPage}/>
        <Route path="/room" component={RoomPage} />
        <Route exact={true} path="/" render={()=>("Home page!")}/>
        <br/>
        <div name="debugNavigation" style={foreground}>
          <Link to="/"> Home </Link>
          <Link to="/default"> Default Page </Link>
          <Link to="/login"> Login Page </Link>
        </div>
      </Router>
    );
  }
}

function DefaultPage() {
  return (
    'Kill me'
  );
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
