import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PrivateScreen = () => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState({});

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
                const {data} = await axios.get("/api/private", config);
                setPrivateData(data.user);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }

        fetchPrivateData();
    }, []); //might need to comment out navigate

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    };

    return error ? (
        <span className='error-message'>{error}</span>
    ) : (
        <>
            <div style={{ background: "green", color: "white" }}>{privateData.email}</div>
            <button onClick={logoutHandler}>Logout</button>
        </>
    );
}

export default PrivateScreen;