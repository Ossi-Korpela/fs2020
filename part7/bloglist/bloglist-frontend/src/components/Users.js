import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (users) => {

    if(users.users.length === 0){
        return null
    }
    return (
        <div>
            <h3>Users</h3>
            <Table striped>
                <tbody>
                    <tr><th></th><th>blogs created</th></tr>
                    {users.users.map(user => 
                        <tr key={user.id}><td><Link to={`${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Users