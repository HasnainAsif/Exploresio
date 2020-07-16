import React, { Fragment, useState } from 'react'
import { Link,Redirect} from 'react-router-dom'
// import Alert from '../layouts/Alert'
import {setAlert} from '../../../actions/alert'
import {register,loadin} from '../../../actions/auth'
import PropTypes from 'prop-types'
import Spinner from '../layouts/Spinner'
import { connect } from 'react-redux'

const Register = ({setAlert , auth:{loading,isAuthenticated}, register, loadin}) => {

    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    })
    const {name,email,password,password2} = formData

    const onChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            setAlert('Password do not match','danger')
        }
        else{
            loadin()
            register({name,email,password})
        }
    }

    if(isAuthenticated){
        return <Redirect to = '/'/>
    }

    return (
        <Fragment>

        <div className="container">

            {loading && <Spinner />}
            {/* <Alert/> */}

            <div className="card card-register mx-auto mt-5">
            <div className="card-header">Register an Account</div>
            <div className="card-body">
                <form className = "form" onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">First name</label>
                    <input className="form-control" name = "name" id="exampleInputName" type="text" 
                    onChange={e => onChange(e)} value = {name} placeholder="Enter first name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input className="form-control" name = "email" id="exampleInputEmail1" type="email" 
                    onChange={e => onChange(e)} value = {email} placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <div className="form-row">
                    <div className="col-md-6">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input className="form-control" name = "password" id="exampleInputPassword1" type="password" 
                    onChange={e => onChange(e)} value = {password} placeholder="Password"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="exampleConfirmPassword">Confirm password</label>
                        <input className="form-control" name = "password2" id="exampleConfirmPassword" type="password" 
                        onChange={e => onChange(e)} value = {password2} placeholder="Confirm password"/>
                    </div>
                    </div>
                </div>
                <input type = "submit" className="btn btn-primary btn-block" value = "Register"/>
                </form>
                <div className="text-center">
                <Link className="d-block small mt-3" to="/login">Login Page</Link>
                <Link className="d-block small" to="/forgot-password">Forgot Password?</Link>
                </div>
            </div>
            </div>
            <br/>
        </div>

        </Fragment>
    )
}

Register.propTypes = {
    setAlert : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return{
        auth : state.auth
    }
}

export default connect(mapStateToProps , {setAlert , register, loadin})(Register)
