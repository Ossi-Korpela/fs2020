
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(!props.notification.msgExists){
    return <div></div>
  }
  return (
    <div style={style}>
      {props.notification.msg}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    notification: state.notification
  }
}


const ConnectedNotification = connect(
  mapStateToProps
)(Notification)
export default ConnectedNotification