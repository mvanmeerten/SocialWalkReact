import React from 'react';
import { Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import Api from '../helper/api';
import { setUser } from '../redux/actions'
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Signup from './Signup'

/**
 * Access control component containing the login and signup component
 * The rest of the applicaton routes redirect here, if not logged in
 */
class AccessControl extends React.Component {
  
  render() {
    return (
      <Tabs className="mt-2 mb-1" defaultActiveKey="login">
        <Tab className="m-2" eventKey="login" title="Login">
          <LogIn />
        </Tab>
        <Tab className="m-2" eventKey="signup" title="Signup">
          <Signup />
        </Tab>
      </Tabs>
    )
  }
}

class Login extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {email: '', password: '', validated: false, showAlert: false};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      this.setState({validated: true})
      return
    }
    new Api().loginUser({ email: this.state.email, password: this.state.password }).then(res => {
      if (!res.ok) throw new Error('Network error')
      res.json().then(res => {
        if (!res.email) {
          this.setState({validated: false, showAlert: true})
          return
        }
        const user = { email: res.email, name: res.name, id: res.id }
        this.props.setUser(user)
        this.props.history.push('/')
      })
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="loginForm">
            <Form.Label>Email Address</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
          </Form.Group>
          <Button className="mr-2" variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Alert className="mt-3" variant='danger' dismissible onClose={() => this.setState({showAlert: false})} show={this.state.showAlert}>Invalid credentials</Alert>
      </>
    )
  }
}

const LogIn = withRouter(connect(null, { setUser })(Login))

export { AccessControl, LogIn as Login }