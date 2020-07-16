import React, { Fragment } from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {joinTour} from '../../../actions/tour'

const ActiveStatus = ({auth : {user},joinTour,tour}) => {

    const selectStyle = {
        background : '#F4F4F4',
        width : '100%',
        height : '50px',
        borderRadius : '5px',
        color : '#000',
        paddingLeft : '15px',
        border : 'none'
    }
    const formText = {
        display: 'block',
        marginTop: '0.3rem',
        color: '#888'
    }

    const [formData, setFormData] = useState({
        name : user.name,
        email : user.email,
        phoneNumber : '',
        noOfSeats : '1',
        seatsType : '',
        paymentType : 'CashByHand',
        address : '',
        tourId : tour._id
    })
    const {name,email,phoneNumber,noOfSeats,seatsType,paymentType,address} = formData

    const onChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        joinTour(formData,formData.tourId)
    }

    return (
        <Fragment>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="single_input">
                            <input name="name" type="text" placeholder="Your Name"
                            value={name} onChange = {(e) => onChange(e)} disabled/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="single_input">
                            <input name="phoneNumber" type="number" placeholder="Phone no."
                            value={phoneNumber} onChange = {(e) => onChange(e)} required/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="single_input">
                            <input name="email" type="email" placeholder="Your Email"
                            value={email} onChange = {(e) => onChange(e)} disabled/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="single_input">
                            <select name="noOfSeats" style = {selectStyle}
                            value={noOfSeats} onChange = {(e) => onChange(e)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <small className="form-text" style = {formText}>
                                Select No. of Seats
                            </small>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="single_input">
                            <input name="seatsType" type="text" placeholder="Seat Types"
                            value={seatsType} onChange = {(e) => onChange(e)} required/>
                            <small className="form-text" style = {formText}>
                                Please use comma separated values (eg. Male,Female,Female,Male)
                            </small>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="single_input">
                            <select name="paymentType" style = {selectStyle}
                            value={paymentType} onChange = {(e) => onChange(e)}>
                                <option value="CashByHand">Cash by Hand</option>
                                <option value="JazzCash">Jazz cash</option>
                            </select>
                            <small className="form-text" style = {formText}>
                                Select Payment Type
                            </small>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="single_input">
                            <input name="address" id="" cols="30" rows="10" placeholder="Enter Home Address"
                            value={address} onChange = {(e) => onChange(e)} required/>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="submit_btn">
                            <button className="boxed-btn4" type="submit">submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

ActiveStatus.propTypes = {
    auth : PropTypes.object.isRequired,
    joinTour : PropTypes.func.isRequired,
    tour : PropTypes.object.isRequired
}

export default connect(null , {joinTour})(ActiveStatus)
