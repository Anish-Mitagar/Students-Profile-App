import React from 'react'
import { StudentBlock } from './StudentBlock'


export const StudentsList = ( {students, pageNum} ) => {

    return (
        <div>
            {students.map((student) => (
                <StudentBlock key={student._id} student = {student}/>
            ))}
            <h1>{pageNum}</h1>
        </div>
    )
}
