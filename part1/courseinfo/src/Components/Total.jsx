import React from 'react'

const Total = ({ parts }) => {
  return( <p> Number of exercise { parts.reduce((s, val) => s + val.exercises, 0 )}</p>)
  }

  export default Total