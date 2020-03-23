import React from "react";
import Finder from "./Finder";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Route exact path="/searchUser" component={Finder} />
      <Route
        exact
        path="/searchRepo"
        render={() => <h1>Under Construction!!!!</h1>}
      />
      <Redirect to="/searchUser" />
    </div>
  );
}

export default App;
