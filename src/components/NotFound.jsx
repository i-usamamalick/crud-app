import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <>
        <p>Sorry, the page you are looking for could not be found.</p>
        <Link to={'/'}>Back</Link>
    </>
  )
}
