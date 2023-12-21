import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import RegisterDTO from "../models/RegisterDTO";
import Loader from "../components/loader/Loader";

function Admin() {
    const [users, setUsers] = useState<RegisterDTO[]>([]);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AdminService.GetAllUsers()
            .then((data) => {
                if (Array.isArray(data)) {
                    setUsers(data);
                    setLoading(false);
                    setIsAuthorized(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const makeAdmin = (userId: number) => {
        if (confirm('Are you sure you want to perform this operation?')) {
            AdminService.MakeAdmin(userId)
            .then((data) => {
                if (data) {
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    const deleteUser = (userId: number) => {
        if (confirm('Are you sure you want to perform this operation?')) {
            AdminService.DeleteUser(userId)
            .then((data) => {
                if (data) {
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="container min-w-full px-4 md:px-10 pt-28 pb-4 md:pb-10 min-h-screen bg-transparent space-x-20">
            {!isAuthorized ?
                <h1 className="text-3xl font-bold w-full text-center">Sorry, you are not authorized to access this page</h1> :
                loading ? <Loader /> :
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-5">Users</h1>
                        <div className="flex flex-col space-y-3">
                            {users.map((user) => (
                                <div className="flex flex-row border border-black rounded-full px-10">
                                    <div className="mr-auto">
                                        <p className="text-xl">{user.firstName} {user.lastName}</p>
                                        <p className="text-xl">{user.email}</p>
                                    </div>
                                    <div className="self-center space-x-3">
                                        {user.role! !== 'admin' ? <button onClick={() => makeAdmin(user.id!)} className="p-2 rounded-2xl bg-teal-500 text-white">Make Admin</button> : 
                                        <button className="hover:cursor-default p-2 rounded-2xl bg-green-500 text-white">This user is an Admin
                                        </button>}
                                        <button onClick={() => deleteUser(user.id!)} className="p-2 rounded-2xl bg-red-500 text-white">Delete User</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            }
        </div>
    )
}

export default Admin