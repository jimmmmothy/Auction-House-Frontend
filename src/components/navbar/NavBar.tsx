import "./NavBar.css"
import logo from "../../assets/Zalojnata kushta logo.png"
import { useEffect, useState } from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            setIsLoggedIn(true);
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('jwt');
        window.location.reload();
    };

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
                {isLoggedIn ? (
                    <>
                        <Menu as="li" className="nav-item">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 font-medium text-black bg-yellow-200">
                                    Profile
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-5 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="/profile"
                                                    className={`${active ? 'bg-cyan-100' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    View Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="/settings"
                                                    className={`${active ? 'bg-cyan-100' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a onClick={logout}
                                                    className={`${active ? 'bg-cyan-100' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    Log out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Menu as="li" className="nav-item">
                            <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium text-black bg-cyan-200">
                                <a href="/register" className="w-full h-full nav-link px-4 py-2">Register</a>
                            </Menu.Button>
                        </Menu>
                        <Menu as="li" className="nav-item">
                            <Menu.Button className="inline-flex w-full justify-center rounded-md font-medium text-black bg-cyan-200">
                                <a href="/login" className="nav-link px-4 py-2">Login</a>
                            </Menu.Button>
                        </Menu>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;