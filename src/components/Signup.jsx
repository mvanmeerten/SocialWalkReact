import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Api from '../helper/api'

/**
 * Component for signing up a new user
 */
class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', name: '', password: '', showAlert: false, validated: false}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      this.setState({validated: true})
      return
    }
    new Api().signupUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      if (response.ok) {
        this.setState({email: '', name: '', password: '', validated: false, showAlert: true})
      }
    })
  }

  render() {
    return (
      <>
      <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Group controlId="emailForm">
          <Form.Label>Email Address</Form.Label>
          <Form.Control required type="email" placeholder="Email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="nameForm">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" placeholder="Name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
          <Form.Control.Feedback type="invalid">
            Please enter a name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="groupDateForm">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
        </Form.Group>
        <Button className="mr-2" variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
      <Alert className="mt-2" variant='success' dismissible onClose={() => this.setState({showAlert: false})} show={this.state.showAlert}>Successfully registered! You may now login</Alert>
      </>
    )
  }
}

export default Signup