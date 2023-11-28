import "../../App.css"

function ProfilePage() {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-8">
                {/* Listings */}
                <div className="col-span-2">
                    <h2 className="text-2xl font-bold mb-4">My Listings</h2>
                    {/* Your listing components or items will go here */}
                </div>

                {/* Bidding History */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Bidding History</h2>
                    {/* Bidding history components or items will go here */}
                </div>
            </div>

            {/* Profile Information */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                <form className="flex flex-col space-y-4">
                    {/* Input fields for profile information */}
                    <label>
                        Name:
                        <input type="text" className="border rounded p-2" />
                    </label>
                    <label>
                        Email:
                        <input type="email" className="border rounded p-2" />
                    </label>
                    {/* Add more fields as needed */}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
} 


export default ProfilePage;