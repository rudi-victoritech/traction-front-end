import React from "react";
import AppNavbar from "./components/AppNavbar";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import TasksView from "./components/Views/TasksView";
import ListsView from "./components/Views/ListsView";
import ProfileView from "./components/Views/ProfileView";
import NotFoundView from "./components/Views/NotFoundView";

export default function App() {
  return (
    <>
      <AppNavbar />
      <Switch>
        <Route path="/" component={TasksView} exact />
        <Route path="/lists" component={ListsView} exact />
        <Route path="/profile" component={ProfileView} exact />
        <Route component={NotFoundView} exact />
      </Switch>
    </>
  );
}
