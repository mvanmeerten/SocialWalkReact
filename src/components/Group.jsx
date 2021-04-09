import React from 'react'
import { Row, Col, Table, Card, Button } from 'react-bootstrap'
import Api from '../helper/api'
import LineChart from './LineChart'
import { withRouter } from 'react-router-dom'

/**
 * Group component containing the rankings and linechart of this group's users
 */
class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {group: {users: []}}
    this.leaveGroup = this.leaveGroup.bind(this);
  }

  leaveGroup() {
    new Api().leaveGroup({ id: this.props.match.params.id }).then(response => {
      if (response.ok) {
        this.props.history.push('/')
      }
    })
  }

  componentDidMount() {
    new Api().group({ id: this.props.match.params.id }).then(response => {
      response.json().then(result => {
        this.setState({group: result})
      })
    })
  }

  render() {
    var rowsTotal = []
    var rowsToday = []
    const users = this.state.group.users
    users.sort((x, y) => y.steps - x.steps)
    
    for (var i=0; i<users.length; i++) {
      rowsTotal.push(<tr key={users[i].id}>
        <td>{i+1}</td>
        <td>{users[i].name}</td>
        <td>{users[i].steps}</td>
        <td>{users[i].average}</td>
      </tr>)
    }

    users.sort((x, y) => y.today - x.today)
    for (i=0; i<users.length; i++) {
      rowsToday.push(<tr key={users[i].id}>
        <td>{i+1}</td>
        <td>{users[i].name}</td>
        <td>{users[i].today}</td>
      </tr>)
    }

    return (
      <>
        <Row className="mt-2">
          <Col>
            <h2>{this.state.group.name}</h2>
          </Col>
          <Col md="auto" className="px-1">
            { this.state.group.isAdmin ? <Button className="float-right" onClick={() => this.props.history.push(`/groupEdit/${this.props.match.params.id}`)}>Edit</Button> : <></> }
          </Col>
          <Col md="auto" className="pl-1">
            <Button className="float-right" onClick={this.leaveGroup}>Leave</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card className="p-0">
              <Card.Header className="text-center"><h2>Steps since {this.state.group.date}</h2></Card.Header>
              <Card.Body className="p-0">
                <Table className="m-0" striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Steps</th>
                      <th>Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowsTotal}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="p-0">
              <Card.Header className="text-center"><h2>Steps Today</h2></Card.Header>
              <Card.Body className="p-0">
                <Table className="m-0" striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Steps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowsToday}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <LineChart users={users} date={this.state.group.date} />
          </Col>
        </Row>
      </>
    )
  }
}

export default withRouter(Group)