import { Table } from 'react-bootstrap';
import React from 'react'
import { withRouter } from "react-router";

/**
 * GroupOverview component providing an overview of the user's groups
 */
class GroupOverview extends React.Component {
  render() {
    const handleRowClick = (id) => {
      this.props.history.push(`/group/${id}`)
    }
    var rows = []
    this.props.groups.forEach((group) => {
      rows.push(
        <tr key={group.id} onClick={()=> handleRowClick(group.id)} style={{cursor: "pointer"}}>
          <td>{group.name}</td>
          <td>{group.date}</td>
        </tr>
      )
    })

    return (
      <>
        <h2>My Groups</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </>
    )
  }
}

export default withRouter(GroupOverview)