import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const SingleTourItem = ({joining:{
                        user,name,email,address,seatsType,joiningDate,phoneNumber,noOfSeats,paymentType
                        }
                        }) => {
    return (
        <Fragment>
            <div className="my-box-exploresio">
                <div className="row">
                    <div className="col no-gutters">
                        <div className='my-text color1'>
                            <p>User Id</p>
                            <p>Name</p>
                            <p>Email</p>
                            <p>Address</p>
                            <p>Phone Number</p>
                            <p>No Of Seats</p>
                            <p>Seats Type</p>
                            <p>Payment Method</p>
                            <p>Joining Date</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className='my-text color2'>
                            <p>{user}</p>
                            <p>{name}</p>
                            <p>{email}</p>
                            <p>{address}</p>
                            <p>{phoneNumber}</p>
                            <p>{noOfSeats}</p>
                            <p>{seatsType.join(',')}</p>
                            <p>{paymentType}</p>
                            <p><Moment format='YYYY/MM/DD'>{joiningDate}</Moment></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

SingleTourItem.propTypes = {
    joining : PropTypes.object.isRequired
}

export default SingleTourItem
