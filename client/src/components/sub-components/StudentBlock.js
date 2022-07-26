import React from 'react'

export const StudentBlock = ( {student} ) => {
  return (
    <div>
        <h1>{student.first_name} {student.last_name}</h1>
        <h2>Major: {student["major 1"]}</h2>
        <h3>Email: {student.email}</h3>
    </div>
  )
}
