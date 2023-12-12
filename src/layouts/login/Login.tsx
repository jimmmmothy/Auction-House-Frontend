import React, { useEffect, useState } from 'react';
import '../register/Register.css';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import "../../App.css"
import "./Login.css"

const Login: React.FC = () => {
    const [userData, setUserData] = useState<LoginDTO>({
        email: '',
        password: ''
    });

    interface IsError {
        isError: boolean,
        message: string
    }
    const [isError, setIsError] = useState<IsError>({
        isError: false,
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) navigate("/");

        if (isSubmitting) {
            const errorDiv = document.getElementById('error');
            if (errorDiv) {
                errorDiv.classList.add('expand');
                setTimeout(() => {
                    errorDiv.classList.remove('expand');
                }, 500);
            }

            setIsSubmitting(false);
        }
    }, [isSubmitting]);

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

        setIsSubmitting(true);

        if (!userData.email || !userData.password) {
            setIsError({
                isError: true,
                message: "Please fill in all missing fields"
            });

            return;
        }

        UserService.AuthenticateUser(userData)
            .then(response => {
                console.log("here")
                localStorage.setItem("jwt", response.data);
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                if (error.response !== undefined) {
                    setIsSubmitting(true);
                    setIsError({
                        isError: true,
                        message: error.response.data
                    });
                } else {
                    setIsSubmitting(true);
                    setIsError({
                        isError: true,
                        message: "Network error"
                    });
                }

                return;
            });




        setIsSubmitting(false);
    }

    return (
        <div className="container max-w-full bg-transparent min-h-screen font-josefin">
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
                        <div id='error' className={isError.isError ? 'text-red-600 text-center expand' : 'hidden'}>{isError.message}</div>
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