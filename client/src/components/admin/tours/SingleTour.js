import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {getTourById} from '../../../actions/tour'
import { useEffect } from 'react'
import Spinner from '../../home/layouts/Spinner'
import Moment from 'react-moment'
import SingleTourItem from './SingleTourItem'

const SingleTour = ({getTourById, tour:{loading,tour}, match}) => {

    useEffect(() => {
        getTourById(match.params.id)
    }, [getTourById,match.params.id])

    let seats = 0
    tour !== null && (
        tour.joinTour.forEach(joining => {
            seats = parseInt(joining.noOfSeats,10) + seats
        })
    )

    let status = tour !== null && (
                    tour.isActive ? 'Active' : 
                    tour.isCurrent ? 'Current' : 
                    tour.isFinished ? 'Finished' : 
                    'null')

    return (
        <Fragment>
            {loading || tour === null ? <Spinner/> : (
                <Fragment>
                    <h2>{tour.destinationName}</h2>
                    <table className="table table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>Days to Travel</th>
                                <th>Price</th>
                                <th>Riding Area</th>
                                <th>Riding Time</th>
                                <th>Launch Date</th>
                                <th>Travel Date</th>
                                <th>No. of Subscribers</th>
                                <th>No. of Seats</th>
                                <th>Tour Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{tour.noOfDays}</td>
                                <td>{tour.price}</td>
                                <td>{tour.ridingArea}</td>
                                <td>{tour.ridingTime}</td>
                                <td><Moment format = "YYYY/MM/DD">{tour.date}</Moment></td>
                                <td><Moment format = "YYYY/MM/DD">{tour.travelDate}</Moment></td>
                                <td>{tour.joinTour.length}</td>
                                <td>{seats}</td>
                                <td>{status}</td>
                            </tr>
                        </tbody>
                    </table>

                    {tour !== null && tour.joinTour.length > 0 && (
                        <div className='body2'>
                            <div className='all-boxes'>
                                {tour.joinTour.map(joining => 
                                    <SingleTourItem key = {joining._id} joining = {joining}/>)
                                }
                            </div>
                        </div>
                    )}

                </Fragment>
            )}
            
        </Fragment>
    )
}

SingleTour.propTypes = {
    getTourById : PropTypes.func.isRequired,
    tour : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    tour : state.tour
})

export default connect(mapStateToProps , {getTourById})(SingleTour)
