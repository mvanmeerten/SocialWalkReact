import React from 'react';
import './App.css';
import { AccessControl } from './components/AccessControl'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Group from './components/Group'
import { connect } from 'react-redux'
import { isLoggedIn } from './helper/api'
import GroupSearch from './components/GroupSearch';
import User from './components/User'
import GroupEdit from './components/GroupEdit'

function App(props) {
  // const [loggedIn, setLoggedIn] = useState(false)

  // useEffect(async () => {
  //   setLoggedIn(await new Api().loggedIn())
  // }, []);
  
  return (
    <>
      <NavBar />
      {/* All routes in the react app */}
      <Container>
        <Switch>
          <Route path="/accessControl">
            {isLoggedIn() ? <Redirect to="/accessControl" /> : <AccessControl />}
          </Route>
          <Route path="/user">
            {isLoggedIn() ? <User /> : <Redirect to="/accessControl" />}
          </Route>
          <Route path="/groups">
            {isLoggedIn() ? <GroupSearch /> : <Redirect to="/accessControl" />}
          </Route>
          <Route path="/group/:id">
            {isLoggedIn() ? <Group /> : <Redirect to="/accessControl" />}
          </Route>
          <Route path="/groupEdit/:id">
            {isLoggedIn() ? <GroupEdit /> : <Redirect to="/accessControl" />}
          </Route>
          <Route path="/">
            {isLoggedIn() ? <Home /> : <Redirect to="/accessControl" />}
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default connect((state) => ({user: state.user}))(App);
