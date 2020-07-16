import React, { Fragment } from 'react'
import { Route } from "react-router-dom";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Alert from '../layouts/Alert';

const HomeRoute = ({component : Component, ...rest }) => (
    <Fragment>
    <Header/>
    <Alert/>
    <Route {...rest} render = {props => <Component {...props} /> } />
    <Footer/>
    </Fragment>
)

export default HomeRoute
