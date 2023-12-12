const CheckAuth = () : boolean => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        document.location.assign('/login')

        return false;
    }

    return true;
};

export default CheckAuth;
