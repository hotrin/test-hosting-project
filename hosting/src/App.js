import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ServersPage from "./pages/servers.page";
import NewServersPage from "./pages/new.servers.page";


const App = props => {
  return (
    <Router>
      <Route path="/" exact component={ServersPage} />
      <Route path="/new/" component={NewServersPage} />
      {/* <Route path="/users/" component={Users} /> */}
    </Router>
  )
}
export default App;
// npm start // src folder
