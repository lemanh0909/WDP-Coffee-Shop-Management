import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [role, setRole] = useState(null);
    const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        try {
            const decodedToken = jwtDecode(userData?.accessToken);
            const userRole = decodedToken.role;

            setRole(userRole);
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }

    }, [userData]);

    return [role];
}
export default useAuth;