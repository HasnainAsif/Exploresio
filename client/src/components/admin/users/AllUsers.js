import React,{ Fragment,useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsers } from "../../../actions/auth";
import AllUsersItem from './AllUsersItem'
import Spinner from '../layouts/Spinner'

const AllUsers = ({getUsers, auth:{loading , users}}) => {

    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <Fragment>

            {users === null || loading ? (
                <Spinner/>
            ) : (
                <Fragment>
                    <h2>All Users</h2>
                    <table className="table table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Allow Admin</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 && (<Fragment>
                                {users.map(user => <AllUsersItem key={user._id} user = {user}/>)}
                            </Fragment>)}
                        </tbody>
                    </table>
                </Fragment>
            )}
        </Fragment>
    )
}

AllUsers.propTypes = {
    getUsers : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps , {getUsers})(AllUsers)
