import "./NavBar.css"
import logo from "../../assets/Zalojnata kushta logo.png"

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <a href="/" className="nav-link">
                    <img src={logo} alt="Logo" className="nav-item logo"></img>
                </a>
                <li className="nav-item">
                    <a href="/categories" className="nav-link">Categories</a>
                </li>
                <li className="nav-item">
                    <a href="/collections" className="nav-link">Collections</a>
                </li>
            </ul>
            <ul className="navbar-nav reverse">
                <li className="nav-item">
                    <a href="/register" className="nav-link">Register</a>
                </li>
                <li className="nav-item">
                    <a href="/login" className="nav-link">Login</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;