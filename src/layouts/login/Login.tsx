import React, { useState } from 'react';
import '../register/Register.css';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import "../../App.css"

const Login: React.FC = () => {
    const [userData, setUserData] = useState<LoginDTO>({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData({
            ...userData,
            [id]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        UserService.AuthenticateUser(userData).then(
            response => {
                localStorage.setItem("jwt", response.data);
                navigate("/");
                window.location.reload();
            });
    }

    return (
        <div className="container bg-transparent">
            <div className="row">
                <div>
                    <h2 className='font-bold text-xl mb-5'>Login to your account!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="email">Email</label>
                            <input className="rounded-lg" type="email" id="email" value={userData.email} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="password">Password</label>
                            <input className="rounded-lg" type="password" id="password" value={userData.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn bg-cyan-500 w-full h-10 text-white mt-3 mb-3 transition-colors hover:bg-blue-600">
                            Log in
                        </button>
                    </form>
                </div>
            </div >
            <div>
                <p className='text-center'>
                    Don't have an account? <Link to="/register" className='text-cyan-500 hover:text-blue-600 transition-colors'>Register</Link>
                </p>
            </div>
        </div >
    );
};

export default Login;