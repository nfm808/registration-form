import React from 'react'


// This function checks if there is an error and 
// renders an error div if one is found otherwise
// will render nothing in the form of the fragment
export default function ValidationError(props) {
  if(props.hasError) {
    return (
      <div className='error'>{props.message}</div>
    );
  }
  return <></>
}
