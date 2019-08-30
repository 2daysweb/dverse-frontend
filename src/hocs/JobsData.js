import React from 'react'

const withJobsData = (WrappedComponent) => {
   
    const data = []

    return (props) => {
        return(
            <div>
                <WrappedComponent {...props}/>
            </div>
        )
    }

}


