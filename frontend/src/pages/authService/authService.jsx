import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        try {

            const decodedToken = jwtDecode(accessToken);

            const userRole = decodedToken.role;

            return userRole;
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    } else {
        return null;
    }
};
