import React, { use, useEffect, useState } from 'react'
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        console.log("Error fetching user data:", error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
        <h1>Welcome {user?.name}</h1>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
    </div>
  )
}

export default Dashboard
