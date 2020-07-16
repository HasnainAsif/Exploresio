import React, { useState,Fragment } from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';    
import { connect } from 'react-redux';
import { addImage, createMainDestination } from "../../../actions/customTour";
import { withRouter } from 'react-router-dom';

const CreateCustomTour = ({addImage, createMainDestination, history}) => {

    const [formData, setFormData] = useState({
        superDestination : '',
        superFile : null
    })
    const {superDestination,superFile} = formData

    const checkMimeType=(event)=>{
        let files = event.target.files[0] 
        let err = ''
        const types = ['image/png', 'image/jpeg','image/jpg']
        if (types.every(type => files.type !== type)) {
            err += files.type+' is not a supported format\n';
            toast.error(err,{draggable : true})
        }
        
        if(err !== '') {
            event.target.value = null
            return false; 
        }
        return true;
      
    }

    const onFileChange = (e) => {
        if(checkMimeType(e))
            setFormData({...formData, superFile : e.target.files[0]})
    }

    const addImg = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('file',superFile)
        if(superFile === null)
            toast.success(`Add an image first`,{draggable: true})//{autoClose: 1000}
        else{
            addImage(data)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createMainDestination(formData,history)
    }

    return (
        <Fragment>
            <h1>Create Main Destination</h1>
            <ToastContainer />
            <form className='form'>

                <div className="form-group">
                    <label htmlFor="superDestination">* Destination Name</label>
                    <input type="text" name="superDestination" className="form-control" value={superDestination}
                    onChange={e => setFormData({...formData,superDestination : e.target.value})} 
                    placeholder="* Enter Main Destination Name"/>
                    <small>e.g; Azad Kashmir or KPK </small>
                </div>

                <div className="form-group">
                    <label htmlFor="superFile">Upload File</label>
                    <input type="file" name="superFile" className="form-control"
                    onChange={e => onFileChange(e)}/>
                    <button className="btn" style = {{background : '#64B5F6',color : 'white'}}
                    onClick={e => addImg(e)}>Upload</button>
                    <small>Add 1st image for home page and 2nd for Cover</small>
                </div>
                <div>
                <button onClick={e => onSubmit(e)} className="btn btn-primary">Submit</button>
                </div>
            </form>
            <br/>
        </Fragment>
    )
}

CreateCustomTour.propTypes = {
    addImage : PropTypes.func.isRequired,
    createMainDestination : PropTypes.func.isRequired
}

export default connect(null, {addImage,createMainDestination})(withRouter(CreateCustomTour))