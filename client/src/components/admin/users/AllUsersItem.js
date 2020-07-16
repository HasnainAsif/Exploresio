import React, { useState,Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import '../../../switch.css'
import { connect } from 'react-redux'
import {deleteUser, updateAdmin} from '../../../actions/auth'
//For Toastr
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';

const AllUsersItem = ({
    deleteUser,updateAdmin,
    user:{_id,name,email,isAdmin,date}
    }) => {

    const [formData, setFormData] = useState({
        allowAdmin : isAdmin})

    const {allowAdmin} = formData

    const onChange = (e) => {
        setFormData({...formData,allowAdmin : !allowAdmin})
        updateAdmin(_id,!allowAdmin)
        if(!allowAdmin)
            toast.success(`${name} is now Admin`,{  draggable: true})//{autoClose: 1000}
        else
            toast.success(`${name} is removed from Admin`,{  draggable: true})
    }

    return (
        <Fragment>
             <tr>
                <td>{_id}<ToastContainer /></td>
                <td>{name}</td>
                <td>{email}</td>
                <td><label className="switch">
                    {email === 'hussnainasif173@gmail.com' ? <input data-id={_id} type="checkbox" 
                    name="allowAdmin" value={allowAdmin} checked readOnly/> : 
                    <input data-id={_id} type="checkbox" name="allowAdmin" value={allowAdmin} 
                    defaultChecked={isAdmin} onChange={(e) => onChange(e)}/>}
                    
                    <span className="slider round"></span>
                    </label>
                </td>
                <td><Moment format = "YYYY/MM/DD">{date}</Moment></td>
                <td>
                    <input type="submit" value="Delete" className="btn btn-danger" 
                    onClick={() => deleteUser(_id)}/>
                </td>
            </tr>
        </Fragment>
    )
}

AllUsersItem.propTypes = {
    user : PropTypes.object.isRequired,
    deleteUser : PropTypes.func.isRequired,
    updateAdmin : PropTypes.func.isRequired
}
 
export default connect(null, {deleteUser,updateAdmin})(AllUsersItem)
