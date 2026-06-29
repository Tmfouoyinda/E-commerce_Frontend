import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';


function ProtectedRoute({ children }) {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute