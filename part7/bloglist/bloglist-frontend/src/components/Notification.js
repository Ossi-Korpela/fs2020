import React from 'react'

const Notification = ({message}) => {
    if(message === '' || message === undefined){
      return null
    }
    return(
      <div className="msg">
        {message}
      </div>
    )
  }

export default Notification

