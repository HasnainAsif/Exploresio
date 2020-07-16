import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { emailMsg } from "../../../actions/newsletter";

const Newsletter = ({emailMsg}) => {

    const [formData, setFormData] = useState({
        subject : '',
        body : ''
    })
    const {subject,body} = formData

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        emailMsg(subject,body)
    }

    return (
        <Fragment>
            <h2>Send Message to all Email</h2>
            <form className = 'form' onSubmit={e => onSubmit(e)}>

                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" name="subject" className="form-control" value={subject}
                    onChange={e => onChange(e)} placeholder="* Enter Subject"/>
                </div>

                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea name="body" cols="30" rows="7" className="form-control" value={body}
                    onChange={e => onChange(e)} placeholder="* Enter Description or Add HTML"></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Fragment>
    )
}

Newsletter.propTypes = {
    emailMsg : PropTypes.func.isRequired
}

export default connect(null , {emailMsg})(Newsletter)
