import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import GroupOverview from './GroupOverview';
import NewGroup from './NewGroup';
import Api from '../helper/api'

/**
 * The homepage containing a group overview and new group component
 */
class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {groups: []}
  }

  componentDidMount() {
    new Api().getGroupsOfUser().then(response => {
      response.json().then(result => {
        this.setState({groups: result})
      })
    })
  }

  render() {
    return (
      <Row className="mt-4">
        <Col>
          <GroupOverview groups={this.state.groups} />
        </Col>
        <Col>
          <NewGroup />
          <Button className="m-3" onClick={new Api().populateDB}>Populate DB </Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps)(Home)