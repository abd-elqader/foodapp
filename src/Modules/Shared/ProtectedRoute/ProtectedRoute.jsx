import {Navigate} from "react-router-dom";

export default function ProtectedRoute({loginData, children}) {
    // Check for both token and decoded data
    const token = localStorage.getItem('token');

    if (!token && !loginData) {
        return <Navigate to="/login" />;
    }

    return children;
}