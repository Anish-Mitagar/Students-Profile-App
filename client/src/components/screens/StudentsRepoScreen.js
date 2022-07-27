import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { StudentsList } from '../sub-components/StudentsList'
import { StudentFilters } from '../sub-components/StudentFilters'
import { StudentsPagination } from '../sub-components/StudentsPagination'
import { useNavigate } from 'react-router-dom';

const StudentsRepoScreen = () => {

  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState({});
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login")
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      }

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.user);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    }

    const getUsers = async () => {
      const users = await getFilteredUsers(pageNum, "None", "None", 0, "None", "None", "None", "None")
      console.log(users)
      setStudents(users)
    }

    fetchPrivateData();
    getUsers()
  }, [])


  const getFilteredUsers = async (pageNum, first_name, last_name, tutor_rating, major, year, order, order2) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    }
    const res = await axios.get(
      `/api/private/repo/filteredusers/${first_name}/${last_name}/${tutor_rating}/${major}/${year}/${order}/${order2}/5/${pageNum}`,
      config
    )
    return res.data.profiles
  }

  const setPageNumber = (num) => {
    setPageNum(num)
  }

  const setFilter = (filters) => {
    setFilters(filters)
  }

  useEffect(() => {
    console.log(filters)
    let first_name = filters.first_name !== "" ? filters.first_name : "None"
    let last_name = filters.last_name !== "" ? filters.last_name : "None"
    let major = filters.major !== "" ? filters.major : "None"
    let year = filters.year !== "" ? filters.year : "None"
    let order = filters.order !== "" ? filters.order : "None"
    let order2 = filters.order2 !== "" ? filters.order2 : "None"

    const getUsers = async () => {
      const users = await getFilteredUsers(pageNum,first_name, last_name, filters.tutor_rating, major, year, order, order2)

      setStudents(users)
    }
    console.log("Change")
    getUsers();

  }, [filters.first_name, filters.last_name, filters.major, filters.tutor_rating, filters.year, filters.order, filters.order2, pageNum])

  return (
    <div>
      {error && <span className="error-message">{error}</span>}
      <StudentFilters setFilter={setFilter} />
      <StudentsList students={students} pageNum={pageNum} />
      <StudentsPagination setPageNumber={setPageNumber} />
    </div>
  )
}

export default StudentsRepoScreen