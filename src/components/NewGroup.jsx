import { Card, Form, Button } from 'react-bootstrap';
import React from 'react'
import Api from '../helper/api'
import { withRouter } from 'react-router-dom'

/**
 * Component for creating a new group
 */
class NewGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: '', dateToTrackFrom: '', validated: false}

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      this.setState({validated: true})
      return
    }
    new Api().createNewGroup({ name: this.state.name, dateToTrackFrom: this.state.dateToTrackFrom }).then(res => {
      if (!res.ok) throw new Error('Network error')
      res.json().then(res => {
        this.props.history.push(`/group/${res.id}`)
      })
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <Card className="">
        <Card.Header><h3>Create a new group</h3></Card.Header>
        <Card.Body>
          <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Group controlId="groupNameForm">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Group name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
              <Form.Control.Feedback type="invalid">
                Enter a group name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="groupDateForm">
              <Form.Label>From Date</Form.Label>
              <Form.Control required type="date" value={this.state.dateToTrackFrom} onChange={e => this.setState({dateToTrackFrom: e.target.value})} />
              <Form.Control.Feedback type="invalid">
                Enter a date
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default withRouter(NewGroup)