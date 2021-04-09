import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux';
import { setUser } from '../redux/actions'
import Api from '../helper/api'
import BarChart from './BarChart'
import moment from 'moment'

/**
 * User (profile) component for editing the user's name and password
 */
class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: this.props.user.email, name: this.props.user.name, password: '', showAlert: false, activities: []}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log(moment().subtract(7, 'days').format('yyyy-MM-DD'))
    new Api().stepsSince({ date: moment().subtract(7, 'days').format('yyyy-MM-DD') }).then(response => {
      response.json().then(result => {
        console.log(result)
        this.setState({activities: result})
      })
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    new Api().editUser({name: this.state.name, password: this.state.password ? this.state.password : ''}).then(res => {
      if (res.ok) {
        this.props.setUser({
          ...this.props.user,
          name: this.state.name
        })
        this.setState({showAlert: true})
      }
    })
  }

  render() {
    return (
      <>
        <h2 className="mt-2">Profile</h2>
        <Form className="mt-2" onSubmit={this.handleSubmit}>
          <Form.Group controlId="emailForm">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" value={this.state.email} readOnly />
          </Form.Group>

          <Form.Group controlId="nameForm">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
          </Form.Group>

          <Form.Group controlId="groupDateForm">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <Alert className="mt-3" variant='success' dismissible onClose={() => this.setState({showAlert: false})} show={this.state.showAlert}>Success!</Alert>
        <BarChart data={this.state.activities.map(activity => {return {x: activity.date, y: activity.steps}})} name={this.state.name}/>
      </>
    )
  }
}

const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps, { setUser })(User)