import React, { Fragment } from 'react'
import { Route , Link } from "react-router-dom";
import Navbar from '../layouts/Navbar';
import AdminFooter from '../layouts/AdminFooter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Header from '../../home/layouts/Header';
import Footer from '../../home/layouts/Footer';
import Alert from '../../home/layouts/Alert';

const AdminRoute = ({component : Component, auth:{loading, isAuthenticated, user}, ...rest }) => (
    <Fragment>
        {
        ((!loading && !isAuthenticated) || (!loading && isAuthenticated && user !==null && !user.isAdmin)) && 
            (<Fragment>
                <Header/>
                    <div style = {{"textAlign" : "center"}}>
                        <h1>OOPS!!!We think you have Lost</h1>
                        <Link to = '/'><button className="btn btn-primary">Back To Home</button></Link>
                    </div>
                <Footer/>
            </Fragment>)
        }

        {!loading && isAuthenticated && user !== null && user.isAdmin &&(<Fragment>
            <div className="fixed-nav sticky-footer bg-dark" id="page-top">
            <Navbar/>
            <div className="content-wrapper">
                <div className="container-fluid">
                <div className="row">
                <div className="col-12">
                    <Alert/>
                    <Route {...rest} render = {props => <Component {...props} /> } />
                </div></div></div>
                    <AdminFooter/>
            </div>
            </div>
        </Fragment>) }
    </Fragment>
)

AdminRoute.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps)(AdminRoute)
