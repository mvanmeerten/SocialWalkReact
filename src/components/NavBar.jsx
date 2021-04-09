import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import Api from '../helper/api'
import { withRouter } from "react-router";
import { setUser } from '../redux/actions'

/**
 * Navbar component containing links to various pages and user state from the redux store
 */
class NavBar extends React.Component {

  render() {
    const logout = () => {
      new Api().logoutUser().then(res => {
        this.props.setUser({})
        this.props.history.push('/accessControl')
      })
    }

    return (
      <Navbar bg="light" expand="lg" className="px-5">
        <LinkContainer to="/">
          <Navbar.Brand>SocialWalk</Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/groups">
              <Nav.Link>Group Search</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="navbar-nav"  className="justify-content-end">
          <Nav>
            <NavDropdown alignRight title={this.props.user.name} id="nav-dropdown">
              <LinkContainer className="override" to="/user">
                <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({user: state.user})

export default withRouter(connect(mapStateToProps, { setUser })(NavBar))
