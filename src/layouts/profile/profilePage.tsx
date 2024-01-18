import { useEffect, useState } from "react";
import "../../App.css"
import RegisterDTO from "../../models/RegisterDTO";
import UserService from "../../services/UserService";
import CheckAuth from "../../services/CheckAuth";
import CountryOptions from "../../components/CountryOptions";
import BiddingHistory from "../../components/BiddingHistory";

function ProfilePage() {
    const [user, setUser] = useState<RegisterDTO>({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        username: "",
        password: "",
        confirmPass: ""
    });

    useEffect(() => {
        if (CheckAuth.CheckAuthenticated()) {
            let userId = CheckAuth.GetLoggedInUserId();

            UserService.GetUserDetails(userId)
                .then((response) => {
                    setUser(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);
        UserService.UpdateUserDetails(user)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container min-w-full px-4 md:px-10 pt-28 pb-4 md:pb-10 min-h-screen bg-transparent space-x-20">
            <div className="flex flex-col gap-8">
                <div className="flex gap-8">
                    {/* Profile Information */}
                    <div className="">
                        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                            {/* Input fields for profile information */}
                            <div className="flex gap-3">
                                <div className="flex flex-col">
                                    <label>
                                        First Name
                                    </label>
                                    <input name="firstName" type="text" value={user?.firstName} className="border-none bg-transparent rounded-lg p-2" onChange={
                                        (e) => setUser({
                                            ...user!,
                                            firstName: e.target.value,
                                        })} />
                                </div>
                                <div className="flex flex-col">
                                    <label>
                                        Last Name
                                    </label>
                                    <input name="lastName" type="text" value={user?.lastName} className="border-none bg-transparent rounded-lg p-2" onChange={
                                        (e) => setUser({
                                            ...user!,
                                            lastName: e.target.value,
                                        })} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label>
                                    Email
                                </label>
                                <input type="email" value={user?.email} className="border-none bg-transparent rounded-lg p-2" onChange={
                                    (e) => setUser({
                                        ...user!,
                                        email: e.target.value,
                                    })} />
                            </div>
                            <div className="flex flex-col">
                                <label>
                                    Phone number
                                </label>
                                <input type="tel" value={user?.phoneNumber} className="border-none bg-transparent rounded-lg p-2" onChange={
                                    (e) => setUser({
                                        ...user!,
                                        phoneNumber: e.target.value,
                                    })} />
                            </div>
                            <div className="flex flex-col">
                                <label>
                                    Country
                                </label>
                                <select className="rounded-lg w-full border-none bg-transparent" id="country" placeholder='Select a country' value={user?.country} onChange={
                                    (e) => setUser({
                                        ...user!,
                                        country: e.target.value,
                                    })}>
                                    <CountryOptions></CountryOptions>
                                </select>
                            </div>
                            {/* Add more fields as needed */}
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                                Save Changes
                            </button>
                        </form>
                    </div>
                    <div className="bg-slate-400 border border-dashed"></div>
                    {/* Bidding History */}
                    {/* <div className="mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Bidding History</h2>
                    </div> */}
                    <BiddingHistory></BiddingHistory>
                </div>

                {/* Listings */}
                <div className="col-span-2">
                    <h2 className="text-2xl font-bold mb-4">My Listings</h2>
                    {/* Your listing components or items will go here */}
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;