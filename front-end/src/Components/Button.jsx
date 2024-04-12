import React from 'react'

function Button(props) {
    console.log(props.children)
  return (
    <button className='std-btn'>
      {props.children}
    </button>
  )
}

export default Button
