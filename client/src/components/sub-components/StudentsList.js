import React from 'react'
import { StudentBlock } from './StudentBlock'


export const StudentsList = ( {students, pageNum, email, role} ) => {

    return (
        <div>
            {students.map((student) => (
                <StudentBlock key={student._id} student = {student} email = {email} role = {role}/>
            ))}
            
        </div>
    )
}
