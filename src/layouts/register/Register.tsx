import React, { useEffect, useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import RegisterDTO from '../../models/RegisterDTO';
import "../../App.css"
import CountryOptions from '../../components/CountryOptions';

const Register: React.FC = () => {
  const [userData, setUserData] = useState<RegisterDTO>({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPass: '',
    phoneNumber: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface IsError {
    isError: boolean,
    message: string
  }
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: ""
  });

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

    if (!userData.email || !userData.firstName ||
      !userData.lastName || !userData.username ||
      !userData.password || !userData.confirmPass ||
      !userData.phoneNumber || !userData.country) {
      setIsError({
        isError: true,
        message: "Please fill in all missing fields"
      });

      return;
    }

    if (userData.password !== userData.confirmPass) {
      // Password and confirmPassword don't match, show an error message.
      setIsError({
        isError: true,
        message: "Passwords do not match"
      })
      return;
    }

    UserService.AddUser(userData).then(
      response => {
        localStorage.setItem("jwt", response.data);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setIsSubmitting(true);
          setIsError({
            isError: true,
            message: error.response.data
          });

          return;
        }
        if (error.response === undefined) {
          setIsSubmitting(true);
          setIsError({
            isError: true,
            message: "Network error"
          });

          return;
        }
      });

    setIsSubmitting(false);
  }

  return (
    <div className="container min-h-screen max-w-full font-josefin">
      <div className="row">
        <div>
          <h2 className='font-bold text-xl mb-5'>Register a new account!</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex space-x-3'>
              <div className="flex flex-col mb-3">
                <label htmlFor="newFirstName">First Name</label>
                <input className="rounded-lg" type="text" id="firstName" value={userData.firstName} onChange={handleChange} />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="newLastName">Last Name</label>
                <input className="rounded-lg" type="text" id="lastName" value={userData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className='flex space-x-3'>
              <div className="flex flex-col mb-3">
                <label htmlFor="newEmail">Email</label>
                <input className="rounded-lg" type="email" id="email" value={userData.email} onChange={handleChange} />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="newUsername">Username</label>
                <input className="rounded-lg" type="text" id="username" value={userData.username} onChange={handleChange} />
              </div>
            </div>
            <div className='flex space-x-3'>
              <div className="flex flex-col mb-3">
                <label htmlFor="newPhone">Phone Number</label>
                <input className="rounded-lg" type="text" id="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
              </div>
              <div className="flex flex-col mb-3 w-2/3 max-w-[209px]">
                <label htmlFor="newCountry">Country</label>
                <select className="rounded-lg w-full" id="country" placeholder='Select a country' value={userData.country} onChange={
                  (e) => setUserData({
                    ...userData,
                    country: e.target.value,
                  })}>
                  <CountryOptions></CountryOptions>
                </select>
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="newPassword">Password</label>
              <input className="rounded-lg" type="password" id="password" value={userData.password} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="confirmPass">Confirm Password</label>
              <input className="rounded-lg" type="password" id="confirmPass" value={userData.confirmPass} onChange={handleChange} />
            </div>

            <div id='error' className={isError.isError ? 'text-red-600 text-center expand' : 'hidden'}>{isError.message}</div>
            <button type="submit" className="btn bg-cyan-500 w-full h-10 text-white mt-3 mb-3 transition-colors hover:bg-blue-600">
              Register
            </button>
          </form>
        </div>
      </div >
      <div>
        <p className='text-center'>
          Already have an account? <Link to="/login" className='text-cyan-500 hover:text-blue-600 transition-colors'>Login</Link>
        </p>
      </div>
    </div >
  );
};

export default Register;