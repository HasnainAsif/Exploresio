import React, { Fragment, useState,useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//For Toastr
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import { addImage, getSingleCustomTour, createDestination } from "../../../actions/customTour";
import Spinner from '../layouts/Spinner'

//React-Dropzone-uploader npm

const CreateTour = ({getSingleCustomTour,customTour:{loading,tour},createDestination,
                    addImage,match,history}) => {
    const [formData, setFormData] = useState({
        id : '',
        destinationName : '',
        destinationProvince : '',
        destinationSlogan : '',
        noOfDays : '',
        file : null,
        price : '',
        description : '',
        subject : '',
        body : '',
        dayDescriptions : []
    })
    const { destinationName,destinationProvince,destinationSlogan,noOfDays,file,
            price,description,dayDescriptions,subject,body } = formData
    const onChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
    }
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
            setFormData({...formData, file : e.target.files[0]})
    }

    const addImg = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('file',file)
        if(file === null)
            toast.success(`Add an image first`,{draggable: true})//{autoClose: 1000}
        else{
            addImage(data)
        }
    }
    const addDayDescription = (e) => {
        e.preventDefault()
        if(dayDescriptions.length < noOfDays){
            setFormData({
                ...formData,
                dayDescriptions : dayDescriptions.concat({subject,body}),
                subject : '',
                body : ''
            })
            toast.success(`${subject} description is added`,{draggable: true,autoClose:3000})
        }else{
            toast.warning(`You cannot add more than ${noOfDays} descriptions`,
                           {draggable: true,autoClose:3000})
            setFormData({
                ...formData,
                subject : '',
                body : ''
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createDestination(formData,history)
    }

    const tourId = tour !== null && tour._id
    useEffect(() => {
        formData.id = tourId
        getSingleCustomTour(match.params.id)
    }, [getSingleCustomTour,tourId])

    return (
        <Fragment>
            {(loading || tour === null) ? <Spinner/> : 
                <Fragment>
                <h1>Create Destination {tour.superDestination}</h1>
                <ToastContainer />
                <form className='form'>

                    <div className="form-group">
                        <label htmlFor="destinationName">* Destination Name</label>
                        <input type="text" name="destinationName" className="form-control" value={destinationName}
                        onChange={e => onChange(e)} placeholder="* Enter Destination Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="destinationProvince">* Destination Province</label>
                        <input type="text" name="destinationProvince" className="form-control" value={destinationProvince} 
                        onChange={e => onChange(e)} placeholder="* Enter Destination Province"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="destinationSlogan">Destination Slogan</label>
                        <input type="text" name="destinationSlogan" className="form-control" value={destinationSlogan} 
                        onChange={e => onChange(e)} placeholder="Enter Destination Slogan"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="noOfDays">* No. Of Days</label>
                        <input type="number" name="noOfDays" className="form-control" value={noOfDays} 
                        onChange={e => onChange(e)} placeholder="* Enter No. Of Days to Travel"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Upload File</label>
                        <input type="file" name="file" className="form-control"
                        onChange={e => onFileChange(e)}/>
                        <button className="btn" style = {{background : '#64B5F6',color : 'white'}}
                        onClick={e => addImg(e)}>Upload</button>
                        <small>Add 1st image for home page and 2nd for Cover</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">* Price</label>
                        <input type="number" name="price" className="form-control" value={price}
                        onChange={e => onChange(e)} placeholder="* Enter Price"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" cols="30" rows="7" className="form-control" value={description} 
                        onChange={e => onChange(e)} placeholder="Enter Description"/>
                    </div>

                    <h3>Add Days Description</h3>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" name="subject" className="form-control" value = {subject}
                        onChange={e => onChange(e)} placeholder="Enter Subject"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea name="body" cols="30" rows="7" className="form-control" value={body}
                        onChange={e => onChange(e)} placeholder="Enter body"/>
                        <button className='btn' style = {{background : '#64B5F6',color : 'white'}}
                        onClick={e => addDayDescription(e)}>
                        Add Day Description</button>
                    </div>
                    <div style = {{textAlign : 'center'}}>
                    <button onClick={e => onSubmit(e)} className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <br/>
                </Fragment>
            }
            
        </Fragment>
    )
}

CreateTour.propTypes = {
    addImage : PropTypes.func.isRequired,
    getSingleCustomTour : PropTypes.func.isRequired,
    customTour : PropTypes.object.isRequired,
    createDestination : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    customTour : state.customTour
})

export default connect(mapStateToProps , {getSingleCustomTour,addImage,createDestination})(withRouter(CreateTour))
