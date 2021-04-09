import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Api from '../helper/api'
import filterFactory, { textFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { Button } from 'react-bootstrap'
import { withRouter } from "react-router";

/**
 * GroupSearch component used for searching, filtering and sortin groups
 */
class GroupSearch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {groups: []}
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleJoin(id) {
    new Api().joinGroup({id}).then(response => {
      if (response.ok) {
        this.props.history.push(`/group/${id}`)
      }
    })
  }

  componentDidMount() {
    new Api().groups().then(response => {
      response.json().then(result => {
        // Add the join button to the data
        this.setState({groups: result.map(res => {return {
          ...res, join: <Button onClick={() => this.handleJoin(res.id)}>Join</Button>
        }
        })})
      })
    })
  }

  render() {
    const columns = [{
      dataField: 'name',
      text: 'Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'date',
      text: 'Date',
      sort: true,
      filter: dateFilter()
    }, {
      dataField: 'participants',
      text: 'Participants',
      sort: true,
      filter: numberFilter()
    }, {
      dataField: 'totalSteps',
      text: 'Total steps',
      sort: true,
      filter: numberFilter()
    }, {
      dataField: 'join',
      text: 'Join'
    }]
    return (
      <div className="mt-2">
        <h2>Group Search</h2>
        <BootstrapTable
          keyField='id'
          data={ this.state.groups }
          columns={ columns }
          filter={ filterFactory() } />
      </div>
    )
  }
}

export default withRouter(GroupSearch)