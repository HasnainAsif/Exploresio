import React,{ Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Alert from '../layouts/Alert'
import { connect } from 'react-redux'
import { postEmail } from "../../../actions/newsletter";

const Newsletter = ({postEmail}) => {

    // const onSubmit = (e) => {
    //     console.log('SUccess')
    // }

    const [formData, setFormData] = useState({
        email : ''
    })
    const {email} = formData

    const onClick = (e) => {
        postEmail(email)
    }

    return (
        <Fragment>
            <Alert/>
        <div className="newletter_area overlay">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-10">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                                <div className="newsletter_text">
                                    <h4>Subscribe Our Newsletter</h4>
                                    <p>Subscribe newsletter to get offers and about
                                        new places to discover.</p>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="mail_form">
                                    {/* <form onSubmit={e => onSubmit(e)}> */}
                                    <div className="row no-gutters">
                                        <div className="col-lg-9 col-md-8">
                                            <div className="newsletter_field">
                                                <input type="email" placeholder="Your mail"
                                                 name = 'email' value={email}
                                                 onChange={e => setFormData({email:e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-4">
                                            <div className="newsletter_btn">
                                                <button className="boxed-btn4 " type="submit" 
                                                onClick = {e => onClick(e)}>Subscribe</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

Newsletter.propTypes = {
    postEmail : PropTypes.func.isRequired
}

export default connect(null , {postEmail})(Newsletter)
