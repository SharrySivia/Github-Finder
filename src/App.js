import React from "react";
import Finder from "./Finder";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Route
        exact
        path="/:search"
        render={routerProps => (
          <Finder search={routerProps.match.params.search} />
        )}
      />
      <Redirect to="/searchUser" />
    </div>
  );
}

export default App;
