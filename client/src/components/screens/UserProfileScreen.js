import '../styles/UserProfileScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserProfileScreen = () => {
    const [error, setError] = useState("");
    const [hasProfile, setHasProfile] = useState(true)
    const [privateUserProfileData, setPrivateUserProfileData] = useState({});

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
                const {data} = await axios.get("/api/private/profile", config);
                setPrivateUserProfileData(data.userProfile);
                setHasProfile(data.userHasProfile)
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }

        fetchPrivateData();
        //classes = privateUserProfileData.classes.join(', ')
    }, []); //might need to comment out navigate


    return (
        <div className='userProfileContainer'>
            {error && <span className="error-message">{error}</span>}
            
            <div className='profileBox'>
                <div className='profileHeader'>
                    <h1>Your Profile:</h1>
                    {hasProfile && <span><div><p></p> <Link to="/editprofile">Edit Profile</Link></div></span>}
                    {!hasProfile && <span><div><p></p> <Link to="/setprofile">Make Profile</Link></div></span>}
                </div>
                <div className='profileInformation'>
                    <div className='profileInfoGroup'>
                        <div className='profileInfo'>
                            <h3>First Name:</h3>
                            <p>{privateUserProfileData.firstname}</p>
                        </div>
                        <div className='profileInfo'>
                            <h3>Last Name:</h3>
                            <p>{privateUserProfileData.lastname}</p>
                        </div>
                    </div>
                    <div className='profileInfoGroup'>
                        <div className='profileInfo'>
                            <h3>First Major:</h3>
                            <p>{privateUserProfileData.major1}</p>
                        </div>
                        <div className='profileInfo'>
                            <h3>Second Major:</h3>
                            <p>{privateUserProfileData.major2}</p>
                        </div>
                        <div className='profileInfo'>
                            <h3>Minor:</h3>
                            <p>{privateUserProfileData.minor}</p>
                        </div>
                    </div>
                    <div className='profileInfoGroup'>
                        <div className='profileInfo'>
                            <h3>GPA: </h3>
                            <p>{privateUserProfileData.gpa}</p>
                        </div>
                        <div className='profileInfo'>
                            <h3>Year:</h3>
                            <p>{privateUserProfileData.year}</p>
                        </div>
                        <div className='profileInfo'>
                            <h3>Tutor Rating: </h3>
                            <p>{privateUserProfileData.tutorrating}</p>
                        </div>
                    </div>
                    <div className='profileInfoGroup'>
                        <div className='profileInfo'>
                            <h3>Classes: </h3>
                            <p>{privateUserProfileData.classes}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Link to="/repo">Go to Repo</Link>
        </div>
        // <div>
        //     {error && <span className="error-message">{error}</span>}
        //     {!hasProfile && <span><div><p>Need to Make Profile!</p> <Link to="/setprofile">Make Profile</Link></div></span>}
        //     {hasProfile && <span><div><p>Edit Profile</p> <Link to="/editprofile">Edit Profile</Link></div></span>}
        //     <header>
        //         <h1>UserProfileScreen!</h1>
        //     </header>
        //     <p>{privateUserProfileData.firstname}</p>
        //     <p>{privateUserProfileData.lastname}</p>
        //     <p>{privateUserProfileData.major1}</p>
        //     <p>{privateUserProfileData.major2}</p>
        //     <p>{privateUserProfileData.minor}</p>
        //     <p>{privateUserProfileData.gpa}</p>
        //     <p>{privateUserProfileData.year}</p>
        //     <p>{privateUserProfileData.tutorrating}</p>
        //     <Link to="/repo">Go to Repo</Link>
        // </div>
    )
}

export default UserProfileScreen;