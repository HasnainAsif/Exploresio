import React , {Fragment} from 'react'

function Spinner() {
    return (
        <Fragment>
            <img
                src = 'img/spinner.gif'
                style = {{width : '200px' , margin : 'auto' , display : 'block'}}
                alt = 'Loading...'
            />
        </Fragment>
    )
}

export default Spinner
