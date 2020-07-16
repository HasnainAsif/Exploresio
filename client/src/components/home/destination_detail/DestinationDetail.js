import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTourById } from "../../../actions/tour";
import Head from './Head';
import Description from './Description';
import Spinner from '../layouts/Spinner';

export const AuthContext = React.createContext()

const DestinationDetail = ({getTourById, tour : {loading , tour}, auth, match}) => {

    useEffect(() => {
        getTourById(match.params.id)
    }, [getTourById,match.params.id])

    return (
        <Fragment>
            {loading || tour === null ? <Spinner/> : 
                <Fragment>
                <Head tour = {tour}/>

                <AuthContext.Provider value = {auth}>
                    <Description tour = {tour} auth = {auth}/>
                </AuthContext.Provider>
                </Fragment>
            }
        </Fragment>
    )
}

DestinationDetail.propTypes = {
    getTourById : PropTypes.func.isRequired,
    tour : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    tour : state.tour,
    auth : state.auth
})

export default connect(mapStateToProps , {getTourById})(DestinationDetail)
