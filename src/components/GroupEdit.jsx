import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Api from '../helper/api'
import { withRouter } from 'react-router-dom'

/**
 * Group edit component for editing the name and date of a group
 */
class GroupEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {group: {}, name: '', dateToTrackFrom: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    new Api().group({ id: this.props.match.params.id }).then(response => {
      response.json().then(result => {
        this.setState({group: result, name: result.name, dateToTrackFrom: result.date})
      })
    })
  }

  handleDelete() {
    new Api().deleteGroup({ id: this.props.match.params.id }).then(res => {
      if (res.ok) {
        this.props.history.push("/")
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    new Api().editGroup({ id: this.props.match.params.id, name: this.state.name, date: this.state.dateToTrackFrom }).then(res => {
      if (!res.ok) throw new Error('Network error')
      res.json().then(res => {
        this.props.history.push(`/group/${this.props.match.params.id}`)
      })
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="groupNameForm">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Group name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
              </Form.Group>

              <Form.Group controlId="groupDateForm">
                <Form.Label>From Date</Form.Label>
                <Form.Control type="date" value={this.state.dateToTrackFrom} onChange={e => this.setState({dateToTrackFrom: e.target.value})} />
              </Form.Group>
              <Form.Row>
                <Button className="mr-2" variant="primary" type="submit">
                  Save
                </Button>
                <Button variant="danger" onClick={this.handleDelete}>
                  Delete
                </Button>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default withRouter(GroupEdit)