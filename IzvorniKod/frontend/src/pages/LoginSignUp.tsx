import React, { useState, FormEvent } from 'react';
import "../components/loginsignup.css";
import GoogleAuth from '../components/GoogleAuth';
import { useNavigate } from 'react-router-dom';

const Loginsignup = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              setMessage(data.message); // Show success message
              navigate('/'); // Redirect to newsfeed
            } else {
              setMessage(data.message); // Show error message from backend
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
    };

    const handleOAuthSuccess = async (credentialResponse: any) => {
        try {
            const response = await fetch('https://biciklik.duckdns.org/auth/google/callback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: credentialResponse.credential }),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              setMessage(data.message); // Show success message
              navigate('/'); // Redirect to newsfeed
            } else {
              setMessage(data.message); // Show error message from backend 
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
    };

    const handleOAuthError = () => {
        setMessage('Google login failed.');
    };

    return (
    <div className="loginsignup">
            <div className="container">
              <p className='LogInNaslov'>User Login</p>
                <p>{message}</p> {/* Display login success/error message */}
                <GoogleAuth onSuccess={handleOAuthSuccess} onError={handleOAuthError} />
            </div>
    </div>
    );
};

export default Loginsignup;