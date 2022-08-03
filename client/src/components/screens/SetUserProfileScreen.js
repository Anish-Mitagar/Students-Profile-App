import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const SetUserProfileScreen = ( {editing, admin} ) => {

    const location = useLocation();
    const data2 = location.state;
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState({});
    const [fName, setFname] = useState("")
    const [lName, setLname] = useState("")
    const [major, setMajor] = useState("None")
    const [major2, setMajor2] = useState("None")
    const [minor, setMinor] = useState("None")
    const [gpa, setGpa] = useState(0.0)
    const [year, setYear] = useState("None")
    const [classes, setClasses] = useState("")
    const [tutor, setTutor] = useState(false)
    const [tutorRating, setTutorRating] = useState(0.0)
    const [interests, setInterests] = useState("")
    const [profile, setProfile] = useState({
        "firstname": fName,
        "lastname": lName,
        "email": admin ? data2.email : privateData.email,
        "major1": major,
        "major2": major2,
        "minor": minor,
        "gpa": gpa,
        "year": year,
        "classes": classes.split(','),
        "istutor": tutor,
        "tutorrating": tutorRating,
        "interests": interests.split(','),
        "flag": false
    })

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

        const uploadProfile = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            if (editing) {
                if (admin) {
                    const {data} = await axios.get(`/api/private/admin/useprofile/${data2.email}`, config);
                    console.log(data)
                    setFname(data.userProfile.firstname);
                    setLname(data.userProfile.lastname);
                    setMajor(data.userProfile.major1);
                    setMajor2(data.userProfile.major2)
                    setMinor(data.userProfile.minor)
                    setGpa(data.userProfile.gpa)
                    setYear(data.userProfile.year);
                    setClasses(data.userProfile.classes.join());
                    setTutor(data.userProfile.istutor);
                    setTutorRating(data.userProfile.tutorrating);
                    setInterests(data.userProfile.interests.join());
                } else {
                    const {data} = await axios.get("/api/private/profile", config);
                    console.log(data)
                    setFname(data.userProfile.firstname);
                    setLname(data.userProfile.lastname);
                    setMajor(data.userProfile.major1);
                    setMajor2(data.userProfile.major2)
                    setMinor(data.userProfile.minor)
                    setGpa(data.userProfile.gpa)
                    setYear(data.userProfile.year);
                    setClasses(data.userProfile.classes.join());
                    setTutor(data.userProfile.istutor);
                    setTutorRating(data.userProfile.tutorrating);
                    setInterests(data.userProfile.interests.join());
                }
            }
        }

        fetchPrivateData();
        uploadProfile();
        //console.log(data2.email);
    }, []); //might need to comment out navigate


    useEffect(() => {
        setProfile({
            "firstname": fName,
            "lastname": lName,
            "email": admin ? data2.email : privateData.email,
            "major1": major,
            "major2": major2,
            "minor": minor,
            "gpa": gpa,
            "year": year,
            "classes": classes.split(','),
            "istutor": tutor,
            "tutorrating": tutorRating,
            "interests": interests.split(','),
            "flag": false
        });

    }, [fName, lName, major, major2, minor, gpa, year, classes, tutor, tutorRating, interests, privateData])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("Submited!")

        const uploadProfileData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                await axios.post("/api/private/profile", profile, config); //was createprofile

            } catch (error) {
                console.log(error)
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }

        const updateProfileData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                if (admin) {
                    console.log(`/api/private/admin/useprofile/${data2.email}`)
                    await axios.patch(`/api/private/admin/useprofile/${data2.email}`, profile, config);
                } else {
                    await axios.patch("/api/private/profile", profile, config); //was updateprofile
                }
                
            } catch (error) {
                console.log(error)
                console.log(error.message)
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }
        if (editing){
            updateProfileData();
        } else {
            uploadProfileData();
        }
        navigate("/repo");
    }

    return error ? (
        <span className='error-message'>{error}</span>
    ) : (
        <div>
            <h2>Set your Profile</h2>
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
                <label>Major</label>
                <br></br>
                <select onChange={(e) => setMajor(e.target.value)} value={major}>
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
                <label>Second Major</label>
                <br></br>
                <select onChange={(e) => setMajor2(e.target.value)} value={major2}>
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
                <label>Minor</label>
                <br></br>
                <select onChange={(e) => setMinor(e.target.value)} value={minor}>
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
                <label>GPA</label>
                <br></br>
                <input type='number' min={0.00} max={4.00} step={0.01} value={gpa} onChange={(e) => setGpa(parseFloat(e.target.value).toFixed(2))}></input>
                <br></br>
                <br></br>
                <label>Year</label>
                <br></br>
                <select onChange={(e) => setYear(e.target.value)} value={year}>
                    <option value="">None</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophmore">Sophmore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>
                <br></br>
                <br></br>
                <label>Classes</label>
                <br></br>
                <input type='text' value={classes} onChange={(e) => setClasses(e.target.value)}></input>
                <br></br>
                <br></br>
                <label>Tutor?</label>
                <br></br>
                <select onChange={(e) => setTutor(e.target.value)} value={tutor}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <br></br>
                <br></br>
                <label>Tutor Rating</label>
                <br></br>
                <input type='number' min={0.00} max={10.00} step={0.01} value={tutorRating} onChange={(e) => setTutorRating(parseFloat(e.target.value).toFixed(2))}></input>
                <br></br>
                <br></br>
                <label>Interests</label>
                <br></br>
                <input type='text' value={interests} onChange={(e) => setInterests(e.target.value)}></input>
                <br></br>
                <br></br>
                <input type='submit' value='Update'></input>
                <br></br>

            </form>
        </div>
    )
}

export default SetUserProfileScreen
