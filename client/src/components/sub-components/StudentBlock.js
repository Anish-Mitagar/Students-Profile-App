import React from 'react'

export const StudentBlock = ( {student} ) => {
  return (
    <div>
        <h1>{student.firstname} {student.lastname}</h1>
        <h2>Major: {student.major1}</h2>
        <h3>Second Major: {student.major2}</h3>
        <h3>Minor: {student.minor}</h3>
        <h3>Classes {student.classes.join(', ')}</h3>
        <h3>Interests {student.interests.join(', ')}</h3>
        <h3>Is Tutor? {student.istutor}</h3>
        <h3>Tutor Rating {student.tutorrating}</h3>
        <h3>Email: {student.email}</h3>
    </div>
  )
}
