import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom'; 

const Register: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div>
          <h2>Register a new account!</h2>
          <form>
            <div className="form-group">
              <label htmlFor="newUsername">Username</label>
              <input type="text" id="newUsername"/>
            </div>
            <div className="form-group">
              <label htmlFor="newEmail">Email</label>
              <input type="email" id="newEmail"/>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Password</label>
              <input type="password" id="newPassword"/>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
      <div>
        <p className='center'>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;