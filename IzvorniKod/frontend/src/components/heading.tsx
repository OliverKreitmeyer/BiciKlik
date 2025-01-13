import logo from '../assets/Bicklik.png'
import "./heading.css"
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import icon from '../assets/icon.png';

const Heading = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); //spremi user role
  const [openProfile, setOpenProfile] = useState(false); //za pop up za logOut
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/auth/getAuthorization", { method: "GET", credentials: "include"})
    .then((response) => {
      if (!response.ok){
        throw new Error("Failed fetch");}
        return response.json();
      })
    .then((data) => {
      if (data.loggedInAs) {
        setLoggedIn(true);
        setUserRole(data.role); 
      } else {
        setLoggedIn(false); //true/false za hardkodiranje
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setLoggedIn(false);
    });
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setLoggedIn(false);
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="Heading">
      <img src={logo} alt='logo' className='logo'></img>

      <ul>
        <li><Link to={"/"} className="clickable">News Feed</Link></li>
        {LoggedIn && <li>
                <Link 
                    to="/chat" 
                    state={{ email, name }}
                    className="clickable"
                >
                    Chat
                </Link>
            </li>} 
        {LoggedIn && <li><Link to={"/createRoute"} className="createButton">Create Route</Link></li>} 
      </ul>

      {LoggedIn ? (
        <>
          <img src={icon} alt='ikona' className='ikona' onClick={() => setOpenProfile((prev) => !prev)}/>
          {openProfile &&
          <div className='dropDown-container'>
          <ul className='dropDown'>
          <li className='logoutItem' onClick={handleLogout}>LogOut</li>
          </ul>
          </div>
          }
        </>
      ) : (
        <Link to={"/login"}> <button className='LogIn'>Log In</button> </Link>
      )}

    </div>
  );
}
export default Heading;