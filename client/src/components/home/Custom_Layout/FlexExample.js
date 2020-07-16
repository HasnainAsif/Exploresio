import React, { Fragment } from 'react'
import '../../../Flex.css'

const FlexExample = () => {
    return (
        <Fragment>
        
        <div className='body2'>
            <div className="my-box">
                <div className="my-box-img"></div>
                <div className="row">
                    <div className="col no-gutters">
                        <div className='my-text color1'>
                            <p>First Name Last Name</p>
                            <p>Mobile Number</p>
                            <p>Email</p>
                            <p>City</p>
                            <p>University</p>
                            <p>Topic</p>
                            <p>Graduation Date</p>
                            <p>GPA</p>
                            <p>Company Name</p>
                            <p>Compaign Name</p>
                            <p>Date Game Completed</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className='my-text color2'>
                            <p>John Doe</p>
                            <p>+92 3013434543</p>
                            <p>JohnDoe@gmail.com</p>
                            <p>Karachi,Pakistan</p>
                            <p>IBA</p>
                            <p>Computer Science</p>
                            <p>March 2020</p>
                            <p>3.6</p>
                            <p>Roche</p>
                            <p>Young Tailent</p>
                            <p>March 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default FlexExample
