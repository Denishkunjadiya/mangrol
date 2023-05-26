import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  return (
    <>
      <Link to={props.link}>
        <button style={{ letterSpacing: '3px', fontSize: '1.5rem' }} className={"btn " + props.class} >
          {props.icon && <span className={props.sClass} style={{ fontSize: props.iHeight || '15px' }} >{props.icon}</span>}
          {props.name}
        </button>
      </Link>
    </>
  )
}

export default Button
