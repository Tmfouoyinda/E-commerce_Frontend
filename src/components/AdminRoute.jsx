import { useAuth } from '../context/AuthContext';
import {Navigate} from "react-router";


function AdminRoute({ children }) {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Chargement...</div>;
    }
    
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return children;
}


export default AdminRoute