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
    }, []); //might need to comment out navigate


    return (
        <div>
            {error && <span className="error-message">{error}</span>}
            {!hasProfile && <span><div><p>Need to Make Profile!</p> <Link to="/setprofile">Make Profile</Link></div></span>}
            {hasProfile && <span><div><p>Edit Profile</p> <Link to="/editprofile">Edit Profile</Link></div></span>}
            <header>
                <h1>UserProfileScreen!</h1>
            </header>
            <p>{privateUserProfileData.firstname}</p>
            <p>{privateUserProfileData.lastname}</p>
            <p>{privateUserProfileData.major1}</p>
            <p>{privateUserProfileData.gpa}</p>
            <p>{privateUserProfileData.year}</p>
            <Link to="/repo">Go to Repo</Link>
        </div>
    )
}

export default UserProfileScreen;