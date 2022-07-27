import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { StudentsList } from '../sub-components/StudentsList'
import { StudentFilters } from '../sub-components/StudentFilters'
import { StudentsPagination } from '../sub-components/StudentsPagination'

const StudentsRepoScreen = () => {
  
    const [students, setStudents] = useState([])
    const [filters, setFilters] = useState({
      first_name: "",
      last_name: "",
      tutor_rating: 0,
      major: "",
      year: "",
      order: "",
      order2: ""
    })
    const [pageNum, setPageNum] = useState(0)

    // const api = axios.create({
    //     baseURL: 'http://localhost:8000/students/'
    // })

    useEffect(() => {
      const getUsers = async () => {
        const users = await getFilteredUsers(pageNum, "None", "None", 0, "None", "None", "None", "None")//getSomeUsers(pageNum)
        //getFilteredUsers(pageNum, "None", "None", 0, "None", "None", "None", "None")
        setStudents(users)
      }
      getUsers()
    }, [])

    // const getFiveUsers = async () => {
    //     const res = await axios.get(
    //         'http://localhost:8000/students/poop',
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         }
    //     )
    //     let students = res.data.data
    //     return students
    // }

    const setFilter = (filters) => {
      setFilters(filters)
    }

    const setPageNumber = (num) => {
      setPageNum(num)
    }

    // const getSomeUsers = async (page) => {
    //     const res = await axios.get(
    //         `http://localhost:8000/students/query/None/None/${0}/None/None/None/None/${page}`,
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         }
    //     )
    //     let students = res.data.data
    //     return students
    // }

    const getFilteredUsers = async (page, first_name, last_name, tutor_rating, major, year, order, order2) => {
      const res = await axios.get(
        `http://localhost:8000/students/query/${first_name}/${last_name}/${tutor_rating}/${major}/${year}/${order}/${order2}/${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      let students = res.data.data
      return students
    }

    // useEffect(() => {
    //     const getUsers = async () => {
    //         setInterval(()=>{}, 1000)
    //         const users = await getSomeUsers(pageNum)
    //         setStudents(users)
    //     }
    //     getUsers()
    // }, [pageNum])

    useEffect(() => {
      console.log(filters)
      let first_name = filters.first_name !== "" ? filters.first_name : "None"
      let last_name = filters.last_name !== "" ? filters.last_name : "None"
      let major = filters.major !== "" ? filters.major : "None"
      let year = filters.year !== "" ? filters.year : "None"
      let order = filters.order !== "" ? filters.order : "None"
      let order2 = filters.order2 !== "" ? filters.order2 : "None"
      const getUsers = async () => {
        setInterval(() => { }, 1000)
        const users = await getFilteredUsers(pageNum, first_name, last_name, filters.tutor_rating, major, year, order, order2)
        setStudents(users)
      }
      getUsers()
    }, [filters.first_name, filters.last_name, filters.major, filters.tutor_rating, filters.year, filters.order, filters.order2, pageNum])



    return (
      <div>
        <StudentFilters setFilter={setFilter} />
        <h1>{pageNum}</h1>
        <StudentsList students={students} pageNum={pageNum} />
        <StudentsPagination setPageNumber={setPageNumber} />
      </div>
    )
}

export default StudentsRepoScreen