import React, { useState } from 'react'

export const StudentFilters = ( {setFilter} ) => {

    const [fName, setFname] = useState("")
    const [lName, setLname] = useState("")
    const [tutorRating, setTutorRating] = useState(0)
    const [major, setMajor] = useState("None")
    const [year, setYear] = useState("None")
    const [order, setOrder] = useState("")
    const [order2, setOrder2] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("Submited!")
        setFilter({
            first_name: fName,
            last_name: lName,
            tutor_rating: tutorRating,
            major: major,
            year: year,
            order: order,
            order2: order2
        })

    }

    return (
        <div>
            <h2>Filters</h2>
            <form onSubmit={onSubmit}>
                <label>First Name</label>
                <br></br>
                <input type='text' placeholder='First Name' value={fName} onChange={(e) => setFname(e.target.value)}></input>
                <br></br>
                <br></br>
                <label>Last Name</label>
                <br></br>
                <input type='text' placeholder='Last Name' value={lName} onChange={(e) => setLname(e.target.value)}></input>
                <br></br>
                <br></br>
                <label>Minimum Tutor Rating</label>
                <br></br>
                <input type='number' min = {0} max = {10} value={tutorRating} onChange={(e) => setTutorRating(parseInt(e.target.value))}></input>
                <br></br>
                <br></br>
                <label>Major</label>
                <br></br>
                <select onChange={(e) => setMajor(e.target.value)} value = {major}>
                    <option value="">None</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business">Business</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Art">Art</option>
                    <option value="Political Science">Political Science</option>
                    <option value="Physical Sceince">Physical Sceince</option>
                    <option value="Food">Food</option>
                    <option value="Sports Management">Sports Management</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                </select>
                <br></br>
                <br></br>
                <label>Year</label>
                <br></br>
                <select onChange={(e) => setYear(e.target.value)} value = {year}>
                    <option value="">None</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophmore">Sophmore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>
                <br></br>
                <br></br>
                <label>Order By</label>
                <br></br>
                <select onChange={(e) => setOrder(e.target.value)} value = {order}>
                    <option value="">None</option>
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                    <option value="tutor rating">Tutor Rating</option>
                    <option value="gpa">GPA</option>
                </select>
                <select onChange={(e) => setOrder2(e.target.value)} value = {order2}>
                    <option value="">None</option>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
                <br></br>
                <br></br>
                <input type ='submit' value='Apply'></input> 
                <br></br>
            </form>
            
            
        </div>
    )
}
