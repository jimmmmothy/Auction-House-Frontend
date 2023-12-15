import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.tsx'
import Register from './layouts/register/Register'
import './App.css'
import Home from './layouts/home/Home.tsx'
import '../dist/output.css'
import Login from './layouts/login/Login.tsx';
import ItemPage from './layouts/items/ItemDetails.tsx';
import ItemPost from './layouts/items/itemPost.tsx';
import ProfilePage from './layouts/profile/profilePage.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckAuth from './services/CheckAuth.ts';
import BidService from './services/BidService.ts';
import { useEffect } from 'react';
import WebSocketService from './services/WebSocketService.ts';
import StompClient from './services/StompClient.ts';

function App() {
  useEffect(() => {
    BidService.GetBidsFromUser(CheckAuth.GetLoggedInUserId())
            .then((bidsFromUser) => {
                let client = StompClient.getStompClient();

                if (!client) {
                    if (bidsFromUser) {
                        WebSocketService.setupStompClient(CheckAuth.GetLoggedInUserId(), bidsFromUser)
                            .then(res => {
                                StompClient.setStompClient(res);
                            });
                    }
                    else {
                        WebSocketService.setupStompClient(CheckAuth.GetLoggedInUserId())
                            .then(res => {
                                StompClient.setStompClient(res);
                            });
                    }
                }
            });
  }, []);

  useEffect(() => {
    WebSocketService.setNotificationCallback((data) => {
      // Render a notification using toast or your notification component
      toast(JSON.parse(data.body).text);
    });
  }, [])

  return (
    <>
      <NavBar />
      <ToastContainer />
      <Router>
        <div className='h-full min-h-screen'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path='/post' element={<ItemPost />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/edit/:id' element={<ItemPost />} />
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App