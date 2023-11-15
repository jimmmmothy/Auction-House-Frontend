import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.tsx'
import Register from './layouts/register/Register'
import './App.css'
import Home from './layouts/home/Home.tsx'
import '../dist/output.css'
import Login from './layouts/login/Login.tsx';

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App