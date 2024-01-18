import "./NavBar.css"
import logo from "../../assets/Zalojnata kushta logo.png"
import { useEffect, useState } from "react";
import { MenuLoggedIn, MenuLoggedOut } from "./NavButtons";
import { jwtDecode } from "jwt-decode";

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    interface Payload {
        sub: string;
        iat: number;
        exp: number;
        role: string;
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            setIsLoggedIn(true);
            const decodedToken : Payload = jwtDecode(token);
            if (decodedToken.role === "admin") {
                setIsAdmin(true);
            }
            const expiresAt = decodedToken.exp * 1000;
            const currentTime = Date.now();
            if (currentTime > expiresAt) {
                localStorage.removeItem('jwt');
                window.location.assign('/login')
                alert("Your session has expired, please log in if you want to continue.");
            }
        }
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar z-10 flex flex-col p-2 font-josefin">
            <div className="flex items-center w-auto space-x-4 justify-center lg:hidden">
                <a href="/" className="nav-link">
                    <img src={logo} alt="Logo" className="nav-item logo"></img>
                </a>
                <div className="lg:hidden"></div>
                <div className="flex flex-col mr-3 items-center self-center lg:hidden">
                    <button onClick={toggleMobileMenu}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`self-end min-w-full mt-5 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className={`flex flex-col space-y-1 items-center ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
                    {/* Navigation links */}
                    <a href="/post" className="nav-link">Post</a>
                    {isLoggedIn ? (
                        <>
                            <MenuLoggedIn></MenuLoggedIn>
                        </>
                    ) : (
                        <MenuLoggedOut></MenuLoggedOut>
                    )}
                </div>
            </div>
            <div className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-4 lg:flex-grow lg:justify-center">
                {/* Navigation links */}
                <a href="/" className="nav-link">
                    <img src={logo} alt="Logo" className="nav-item logo"></img>
                </a>
                <div className="space-x-5 mx-auto">
                    <a href="/post" className="nav-link">Post</a>
                </div>
                {isAdmin ? 
                <div>
                    <a href="/admin" className="nav-link">Admin</a>
                </div> : ''}
                <div className="flex lg:space-x-3 self-center">
                    {isLoggedIn ? (
                        <>
                            <MenuLoggedIn></MenuLoggedIn>
                        </>
                    ) : (
                        <MenuLoggedOut></MenuLoggedOut>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;