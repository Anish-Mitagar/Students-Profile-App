import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    }, [navigate]); //might need to comment out navigate


    return (
        <div>
            {error && <span className="error-message">{error}</span>}
            {!hasProfile && <span><div><p>Need to Make Profile!</p> <button>Make Profile</button></div></span>}
            <header>
                <h1>UserProfileScreen!</h1>
            </header>
            <p>{privateUserProfileData.firstname}</p>
            <p>{privateUserProfileData.lastname}</p>
            <p>{privateUserProfileData.major}</p>
            <p>{privateUserProfileData.gpa}</p>
            <p>{privateUserProfileData.year}</p>
            <button>Go to Repo</button>
        </div>
    )
}

export default UserProfileScreen;