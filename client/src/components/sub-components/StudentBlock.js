import React from 'react'
import { Link } from 'react-router-dom';

export const StudentBlock = ( {student, email, role} ) => {
  return (
    <div className='profileContainer'>
        <div className='minibox'>
          <h1>{student.firstname} {student.lastname} </h1>
          <h2>Major: {student.major1}</h2>
          {(email === student.email) && <span><div> <Link to="/editprofile">Edit</Link></div></span>}
          {(email !== student.email && role === "ADMIN") && <span><div> <Link to="/editprofile-admin" state = {{email: student.email}}>Edit</Link></div></span>}
        </div>
        <div className='minibox'>
          <h3>Second Major: {student.major2}</h3>
          <h3>Minor: {student.minor}</h3>
          <h3>Year: {student.year}</h3>
        </div>
        <div className='minibox'>
          <h3>Classes: {student.classes.join(', ')}</h3>
          <h3>Interests: {student.interests.join(', ')}</h3>
        </div>
        <div className='minibox'>
          <h3>Is Tutoring? {student.istutor ? "Yes": "No"}</h3>
          <h3>Tutor Rating {student.tutorrating}</h3>
          <h3>Email: {student.email}</h3>
        </div>
    </div>
  )
}
