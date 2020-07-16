import React, { Fragment,useEffect } from 'react'
import { Link,Redirect } from 'react-router-dom'
import { verify } from "../../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Verify = ({verify , auth:{msg,isAuthenticated}}) => {

    useEffect(() => {
        verify()
    }, [verify])

    if(isAuthenticated){
        return <Redirect to = '/'/>
    }

    return (
        <Fragment>

            <div style = {{"textAlign" : "center"}}>
            <h1>{msg}</h1>
            <p>Go to Login Page</p>
            <Link to = '/login'><button className= 'btn btn-primary'>Login Page</button></Link>
            </div>
            <br/><br/>

        </Fragment>
    )
}

Verify.propTypes = {
    verify : PropTypes.func.isRequired
}

const mapSTateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapSTateToProps , {verify})(Verify)