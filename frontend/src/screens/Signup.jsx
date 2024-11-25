import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        // Client-side validation
        if (!credentials.name || !credentials.email || !credentials.password || !credentials.geolocation) {
            setMessage("Please fill all the fields.");
            return;
        }
        if (!credentials.email.includes("@")) {
            setMessage("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("https://cantech0.onrender.com/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            const json = await response.json();
            if (!json.success) {
                setMessage(json.message || "Error creating user. Please try again.");
            } else {
                setMessage("Signup successful! Redirecting...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            console.error("Signup error:", error.message);
            setMessage("Server error. Please try again later.");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                {message && <div className="alert alert-info">{message}</div>}

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    );
}

export default Signup;
